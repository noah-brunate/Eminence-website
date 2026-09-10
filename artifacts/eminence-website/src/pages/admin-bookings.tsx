import AdminContent from "@/components/admin-content";
import BookingReplies from "@/components/booking-replies";
import React, { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  type AdminSession,
  type Booking,
  type BookingStatus,
  useListBookings,
  useUpdateBooking,
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  CalendarClock,
  LogOut,
  Mail,
  Phone,
  RefreshCw,
  Save,
} from "lucide-react";

const STATUSES: BookingStatus[] = [
  "new",
  "contacted",
  "scheduled",
  "completed",
  "cancelled",
  "spam",
];

function BookingCard({
  booking,
  csrfToken,
}: {
  booking: Booking;
  csrfToken: string;
}) {
  const [notes, setNotes] = useState(booking.internalNotes || "");
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const update = useUpdateBooking({
    request: {
      credentials: "same-origin",
      headers: { "X-CSRF-Token": csrfToken },
    },
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
        toast({ title: "Booking updated" });
      },
      onError: () => toast({ title: "Update failed", variant: "destructive" }),
    },
  });

  const requestedAt = new Intl.DateTimeFormat("en-UG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: booking.timezone,
  }).format(new Date(booking.preferredAt));

  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-400">
              {booking.status}
            </span>
            <span className="text-xs text-slate-500">
              {new Date(booking.createdAt).toLocaleString()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {booking.name}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {booking.company} · {booking.topic}
          </p>
        </div>
        <select
          value={booking.status}
          disabled={update.isPending}
          onChange={(event) =>
            update.mutate({
              id: booking.id,
              data: { status: event.target.value as BookingStatus },
            })
          }
          className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-sm"
          aria-label={`Status for ${booking.name}`}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid md:grid-cols-2 gap-3 text-sm">
        <a
          className="flex items-center gap-2 text-accent hover:underline"
          href={`mailto:${booking.email}`}
        >
          <Mail className="h-4 w-4" />
          {booking.email}
        </a>
        {booking.phone && (
          <a
            className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:underline"
            href={`tel:${booking.phone}`}
          >
            <Phone className="h-4 w-4" />
            {booking.phone}
          </a>
        )}
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 md:col-span-2">
          <CalendarClock className="h-4 w-4" />
          {requestedAt} ({booking.timezone})
        </div>
      </div>

      {booking.message && (
        <div className="mt-5 rounded-xl bg-slate-50 dark:bg-slate-950 p-4 text-sm whitespace-pre-wrap text-slate-700 dark:text-slate-300">
          {booking.message}
        </div>
      )}

      <div className="mt-5">
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
          Internal notes
        </label>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={3}
          maxLength={5000}
          className="w-full resize-y rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 text-sm"
          placeholder="Notes are visible only to administrators."
        />
        <Button
          className="mt-2"
          size="sm"
          disabled={update.isPending || notes === (booking.internalNotes || "")}
          onClick={() =>
            update.mutate({
              id: booking.id,
              data: { internalNotes: notes || null },
            })
          }
        >
          <Save className="h-4 w-4 mr-2" />
          Save notes
        </Button>
      </div>
      <BookingReplies booking={booking} csrfToken={csrfToken} />
    </article>
  );
}

export default function AdminBookings() {
  const [view, setView] = useState<"bookings" | "content">("content");
  const queryClient = useQueryClient();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const bookings = useListBookings({
    request: { credentials: "same-origin" },
    query: {
      queryKey: ["/api/admin/bookings"],
      enabled: Boolean(session) && view === "bookings",
      retry: false,
    },
  });

  useEffect(() => {
    sessionStorage.removeItem("eminence_admin_key");
    let active = true;
    fetch("/api/admin/session", { credentials: "same-origin" })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          if (active) setSession(data);
        } else if (response.status !== 401) throw new Error();
      })
      .catch(() => {
        if (active)
          setError(
            "Cannot reach the admin service. Please refresh and try again.",
          );
      })
      .finally(() => {
        if (active) setChecking(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if ((bookings.error as { status?: number } | null)?.status === 401) {
      setSession(null);
      queryClient.removeQueries({
        predicate: (q) =>
          String(q.queryKey[0]).startsWith("admin-") ||
          q.queryKey[0] === "/api/admin/bookings",
      });
      setError("Your session expired. Please sign in again.");
    }
  }, [bookings.error, queryClient]);

  useEffect(() => {
    const expire = () => {
      setSession(null);
      queryClient.removeQueries({
        predicate: (q) =>
          String(q.queryKey[0]).startsWith("admin-") ||
          q.queryKey[0] === "/api/admin/bookings",
      });
      setError("Your session expired. Please sign in again.");
    };
    window.addEventListener("admin-session-expired", expire);
    return () => window.removeEventListener("admin-session-expired", expire);
  }, [queryClient]);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "X-Admin-Request": "1" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Sign-in failed.");
      queryClient.removeQueries({ queryKey: ["/api/admin/bookings"] });
      setSession(data);
      setPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Sign-in failed. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  };

  const logout = async () => {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "same-origin",
        headers: { "X-CSRF-Token": session!.csrfToken },
      });
      if (!response.ok && response.status !== 401)
        throw new Error("Sign-out failed. Please try again.");
      setSession(null);
      queryClient.removeQueries({
        predicate: (q) =>
          String(q.queryKey[0]).startsWith("admin-") ||
          q.queryKey[0] === "/api/admin/bookings",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-out failed.");
    } finally {
      setBusy(false);
    }
  };

  if (checking)
    return <p className="px-4 py-24 text-center">Checking your session…</p>;

  if (!session) {
    return (
      <section className="min-h-[70vh] bg-slate-50 dark:bg-slate-950 px-4 py-24">
        <form
          onSubmit={login}
          className="mx-auto max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-lg"
        >
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Website Administration
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in with your administrator email and password.
          </p>
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-600">
              {error}
            </p>
          )}
          <label
            htmlFor="admin-email"
            className="mt-6 block text-sm font-medium"
          >
            Email
          </label>
          <input
            id="admin-email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            autoComplete="username"
            required
            maxLength={254}
            className="mt-2 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3"
          />
          <label
            htmlFor="admin-password"
            className="mt-4 block text-sm font-medium"
          >
            Password
          </label>
          <input
            id="admin-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            autoComplete="current-password"
            required
            maxLength={1024}
            className="mt-2 w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3"
          />
          <Button type="submit" disabled={busy} className="mt-4 w-full">
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Website Administration
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage website content and respond to consultation requests.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => bookings.refetch()}
              disabled={bookings.isFetching}
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${bookings.isFetching ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button variant="outline" onClick={logout} disabled={busy}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>

        {error && (
          <p role="alert" className="mb-4 text-red-600">
            {error}
          </p>
        )}
        <div className="flex gap-3 mb-6">
          <Button
            variant={view === "content" ? "default" : "outline"}
            onClick={() => setView("content")}
          >
            Website content
          </Button>
          <Button
            variant={view === "bookings" ? "default" : "outline"}
            onClick={() => setView("bookings")}
          >
            Bookings & consultations
          </Button>
        </div>
        {view === "content" ? (
          <AdminContent csrfToken={session.csrfToken} />
        ) : bookings.isError ? (
          <p role="alert" className="text-red-600">
            Bookings could not be loaded. Try Refresh; if this continues, check
            the API and database.
          </p>
        ) : bookings.isLoading ? (
          <p className="text-slate-600 dark:text-slate-400">
            Loading bookings…
          </p>
        ) : bookings.data?.length ? (
          <div className="space-y-5">
            {bookings.data.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                csrfToken={session.csrfToken}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-12 text-center text-slate-500">
            No booking requests yet.
          </div>
        )}
      </div>
    </section>
  );
}
