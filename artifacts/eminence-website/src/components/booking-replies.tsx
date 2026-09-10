import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/admin-api";
import type { Booking } from "@workspace/api-client-react";
import type { BookingReply as Reply } from "@workspace/api-client-react";
const input =
  "w-full mt-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3";
export default function BookingReplies({
  booking,
  csrfToken,
}: {
  booking: Booking;
  csrfToken: string;
}) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState("message");
  const [subject, setSubject] = useState("Your EMINENCE consultation");
  const [message, setMessage] = useState("");
  const [appointment, setAppointment] = useState("");
  const [id, setId] = useState(() => crypto.randomUUID());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const client = useQueryClient();
  const history = useQuery({
    queryKey: ["admin-replies", booking.id],
    queryFn: () => adminApi<Reply[]>(`/bookings/${booking.id}/replies`),
    enabled: open,
  });
  const changed = () => {
    setId(crypto.randomUUID());
    setNotice("");
  };
  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!window.confirm(`Send this email to ${booking.email}?`)) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await adminApi(`/bookings/${booking.id}/replies`, {
        method: "POST",
        headers: { "X-CSRF-Token": csrfToken },
        body: JSON.stringify({
          id,
          kind,
          subject,
          message,
          ...(kind !== "message"
            ? { appointmentAt: new Date(appointment).toISOString() }
            : {}),
        }),
      });
      setMessage("");
      setId(crypto.randomUUID());
      setNotice(
        "Email accepted by the mail server. See response history below.",
      );
      await client.invalidateQueries({ queryKey: ["/api/admin/bookings"] });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      await client.invalidateQueries({
        queryKey: ["admin-replies", booking.id],
      });
    }
  };
  return (
    <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
      <Button variant="outline" onClick={() => setOpen(!open)}>
        {open ? "Hide responses" : "Respond by email / View history"}
      </Button>
      {open && (
        <div className="mt-5">
          <form onSubmit={send}>
            <h3 className="text-lg font-semibold">Reply to {booking.name}</h3>
            <p className="text-sm text-slate-500 mt-1">
              To: {booking.email}. This message is sent to the customer;
              internal notes above are never included.
            </p>
            {error && (
              <p role="alert" className="text-red-600 my-3">
                {error}
              </p>
            )}
            {notice && (
              <p
                role="status"
                className="text-emerald-700 dark:text-emerald-400 my-3"
              >
                {notice}
              </p>
            )}
            <fieldset disabled={busy} className="space-y-4 mt-4">
              <label className="block text-sm">
                Response type
                <select
                  className={input}
                  value={kind}
                  onChange={(e) => {
                    setKind(e.target.value);
                    changed();
                  }}
                >
                  <option value="message">General response</option>
                  <option value="confirm">Confirm appointment</option>
                  <option value="propose">Propose another time</option>
                </select>
              </label>
              {kind !== "message" && (
                <label className="block text-sm">
                  Appointment time in your browser timezone (
                  {Intl.DateTimeFormat().resolvedOptions().timeZone})
                  <input
                    className={input}
                    type="datetime-local"
                    required
                    value={appointment}
                    onChange={(e) => {
                      setAppointment(e.target.value);
                      changed();
                    }}
                  />
                  <span className="text-xs text-slate-500">
                    The email displays this time in the customer's timezone:{" "}
                    {booking.timezone}.
                  </span>
                </label>
              )}
              <label className="block text-sm">
                Subject
                <input
                  className={input}
                  required
                  maxLength={200}
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    changed();
                  }}
                />
              </label>
              <label className="block text-sm">
                Message
                <textarea
                  className={input}
                  rows={5}
                  required
                  maxLength={10000}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    changed();
                  }}
                />
              </label>
              <Button type="submit">{busy ? "Sending…" : "Send email"}</Button>
            </fieldset>
          </form>
          <h3 className="font-semibold mt-8 mb-3">Response history</h3>
          {history.isError ? (
            <p role="alert">
              {history.error.message}{" "}
              <Button onClick={() => history.refetch()}>Retry</Button>
            </p>
          ) : history.isLoading ? (
            <p>Loading history…</p>
          ) : !history.data?.length ? (
            <p className="text-sm text-slate-500">No responses yet.</p>
          ) : (
            history.data.map((reply) => (
              <article
                key={reply.id}
                className="rounded-lg bg-slate-50 dark:bg-slate-950 p-4 mb-3"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <strong>{reply.subject}</strong>
                  <span className="text-sm">
                    {reply.status === "sent"
                      ? "Accepted by mail server"
                      : reply.status === "pending"
                        ? "Sending / acceptance not yet recorded"
                        : "Send failed or unconfirmed"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(reply.createdAt).toLocaleString()} ·{" "}
                  {reply.recipient} · {reply.kind}
                </p>
                {reply.appointmentAt && (
                  <p className="text-sm mt-2">
                    Appointment:{" "}
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "full",
                      timeStyle: "short",
                      timeZone: booking.timezone,
                    }).format(new Date(reply.appointmentAt))}{" "}
                    ({booking.timezone})
                  </p>
                )}
                <p className="whitespace-pre-wrap text-sm mt-3">
                  {reply.message}
                </p>
                {reply.error && (
                  <p className="text-sm text-red-600 mt-2">{reply.error}</p>
                )}
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
