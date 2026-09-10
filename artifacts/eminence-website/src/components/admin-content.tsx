import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { adminApi } from "@/lib/admin-api";

import type {
  ContentField as Field,
  ContentSchema as Schema,
  ContentRecord as Row,
} from "@workspace/api-client-react";
const inputClass =
  "w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-sm";
const title = (v: string) =>
  v.replaceAll("-", " ").replace(/^./, (c) => c.toUpperCase());

function Editor({
  row,
  fields,
  csrfToken,
  onClose,
}: {
  row: Row;
  fields: Field[];
  csrfToken: string;
  onClose: () => void;
}) {
  const client = useQueryClient();
  const [data, setData] = useState(row.data);
  const [version, setVersion] = useState(row.version);
  const [position, setPosition] = useState(row.position);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [search, setSearch] = useState("");
  const [dirty, setDirty] = useState(false);
  const change = (key: string, value: unknown) => {
    setData((old) => ({ ...old, [key]: value }));
    setDirty(true);
    setNotice("");
  };
  const save = async (action: "save" | "publish" | "unpublish") => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const saved = await adminApi<Row>(`/content/${row.kind}/${row.id}`, {
        method: "PUT",
        headers: { "X-CSRF-Token": csrfToken },
        body: JSON.stringify({
          data: Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
              key,
              fields.find((f) => f.key === key)?.type === "list" &&
              Array.isArray(value)
                ? value.map((v) => String(v).trim()).filter(Boolean)
                : value,
            ]),
          ),
          version,
          position,
          action,
        }),
      });
      setVersion(saved.version);
      setDirty(false);
      setNotice(
        action === "publish"
          ? "Published. The website will fetch the updated content."
          : action === "unpublish"
            ? "Removed from public listings."
            : "Draft saved. The public website is unchanged.",
      );
      await client.invalidateQueries({ queryKey: ["admin-content", row.kind] });
      if (action !== "save")
        await client.invalidateQueries({
          predicate: (q) => !String(q.queryKey[0]).startsWith("admin-"),
        });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  const remove = async () => {
    if (
      !window.confirm(
        "Delete this record and remove it from the public website?",
      )
    )
      return;
    setBusy(true);
    setError("");
    try {
      await adminApi(`/content/${row.kind}/${row.id}`, {
        method: "DELETE",
        headers: { "X-CSRF-Token": csrfToken },
        body: JSON.stringify({ version }),
      });
      await client.invalidateQueries();
      onClose();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold">
          {row.kind === "pages"
            ? title(row.id)
            : String(
                data.name ||
                  data.title ||
                  data.clientName ||
                  "Company statistics",
              )}
        </h2>
        <Button
          variant="outline"
          disabled={busy}
          onClick={() => {
            if (!dirty || window.confirm("Discard unsaved changes?")) onClose();
          }}
        >
          Back to list
        </Button>
      </div>
      <p className="text-sm text-slate-500 mb-5">
        Save a draft to work privately, or publish to update the website. Page
        structure and styling stay fixed.
      </p>
      {error && (
        <p role="alert" className="text-red-600 mb-4">
          {error}
        </p>
      )}
      {notice && (
        <p
          role="status"
          className="text-emerald-700 dark:text-emerald-400 mb-4"
        >
          {notice}
        </p>
      )}
      {fields.length > 15 && (
        <input
          aria-label="Find content field"
          className={inputClass + " mb-6"}
          placeholder="Find text on this page…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
      <fieldset disabled={busy} className="space-y-5">
        {fields
          .filter((f) =>
            `${f.label} ${data[f.key] ?? ""}`
              .toLowerCase()
              .includes(search.toLowerCase()),
          )
          .map((f) => (
            <label key={f.key} className="block">
              <span className="block text-sm font-medium mb-2">
                {f.label}
                {f.required ? " *" : ""}
              </span>
              {f.type === "choice" ? (
                <select
                  className={inputClass}
                  value={String(data[f.key] ?? "")}
                  onChange={(e) => change(f.key, e.target.value)}
                >
                  <option value="">Choose…</option>
                  {f.choices?.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              ) : f.type === "long" || f.type === "list" ? (
                <textarea
                  className={inputClass}
                  rows={f.key === "body" ? 15 : 4}
                  value={
                    f.type === "list"
                      ? Array.isArray(data[f.key])
                        ? (data[f.key] as string[]).join("\n")
                        : ""
                      : String(data[f.key] ?? "")
                  }
                  onChange={(e) =>
                    change(
                      f.key,
                      f.type === "list"
                        ? e.target.value.split("\n")
                        : e.target.value,
                    )
                  }
                />
              ) : (
                <input
                  className={inputClass}
                  type={f.type === "number" ? "number" : "text"}
                  value={String(data[f.key] ?? "")}
                  onChange={(e) =>
                    change(
                      f.key,
                      f.type === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                    )
                  }
                />
              )}
              {f.type === "list" && (
                <span className="text-xs text-slate-500">
                  One item per line.
                </span>
              )}
              {f.key === "body" && (
                <span className="text-xs text-slate-500">
                  Separate paragraphs with blank lines. Use ## for headings and
                  - for list items. HTML is displayed as text.
                </span>
              )}
            </label>
          ))}
        {row.kind !== "pages" && row.kind !== "stats" && (
          <label className="block text-sm font-medium">
            Display priority
            <input
              type="number"
              min={0}
              className={inputClass + " mt-2"}
              value={position}
              onChange={(e) => {
                setPosition(Number(e.target.value));
                setDirty(true);
              }}
            />
            <span className="text-xs text-slate-500">
              Lower values appear first within the existing collection layout.
            </span>
          </label>
        )}
      </fieldset>
      <div className="flex flex-wrap gap-3 mt-6">
        <Button disabled={busy} variant="outline" onClick={() => save("save")}>
          Save draft
        </Button>
        <Button disabled={busy} onClick={() => save("publish")}>
          Publish changes
        </Button>
        {row.kind !== "pages" && row.kind !== "stats" && version > 0 && (
          <>
            <Button
              disabled={busy}
              variant="outline"
              onClick={() => save("unpublish")}
            >
              Unpublish
            </Button>
            <Button disabled={busy} variant="destructive" onClick={remove}>
              Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
export default function AdminContent({ csrfToken }: { csrfToken: string }) {
  const [kind, setKind] = useState("products");
  const [selected, setSelected] = useState<Row | null>(null);
  const schema = useQuery({
    queryKey: ["admin-content-schema"],
    queryFn: () => adminApi<Schema>("/content/schema"),
  });
  const rows = useQuery({
    queryKey: ["admin-content", kind],
    queryFn: () => adminApi<Row[]>("/content/" + kind),
  });
  if (schema.isError)
    return (
      <p role="alert">
        {schema.error.message}{" "}
        <Button onClick={() => schema.refetch()}>Retry</Button>
      </p>
    );
  if (!schema.data) return <p>Loading content editor…</p>;
  if (selected)
    return (
      <Editor
        key={selected.id}
        row={selected}
        fields={
          selected.kind === "pages"
            ? schema.data.pages[selected.id]
            : schema.data.collections[selected.kind]
        }
        csrfToken={csrfToken}
        onClose={() => setSelected(null)}
      />
    );
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {["pages", ...Object.keys(schema.data.collections)].map((group) => (
          <Button
            key={group}
            variant={kind === group ? "default" : "outline"}
            onClick={() => setKind(group)}
          >
            {group === "pages" ? "Page text & links" : title(group)}
          </Button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 mb-5">
        <h2 className="text-2xl font-bold">
          {kind === "pages" ? "Website pages" : title(kind)}
        </h2>
        {!["pages", "stats"].includes(kind) && (
          <Button
            onClick={() =>
              setSelected({
                id: crypto.randomUUID(),
                kind,
                data: Object.fromEntries(
                  schema.data!.collections[kind].map((f) => [
                    f.key,
                    f.type === "number" ? 0 : f.type === "list" ? [] : "",
                  ]),
                ),
                published: false,
                publishedData: null,
                position: rows.data?.length ?? 0,
                version: 0,
                updatedAt: "",
              })
            }
          >
            Add {kind === "posts" ? "article" : "record"}
          </Button>
        )}
      </div>
      {rows.isError ? (
        <p role="alert">
          {rows.error.message}{" "}
          <Button onClick={() => rows.refetch()}>Retry</Button>
        </p>
      ) : rows.isLoading ? (
        <p>Loading…</p>
      ) : !rows.data?.length ? (
        <p>No records yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {rows.data.map((row) => (
            <button
              key={row.id}
              onClick={() => setSelected(row)}
              className="text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-teal-600"
            >
              <span className="block font-semibold">
                {kind === "pages"
                  ? title(row.id)
                  : String(
                      row.data.name ||
                        row.data.title ||
                        row.data.clientName ||
                        "Company statistics",
                    )}
              </span>
              <span className="block text-sm text-slate-500 mt-2">
                {row.published ? "Published" : "Draft / unpublished"}
                {row.published &&
                JSON.stringify(row.data) !== JSON.stringify(row.publishedData)
                  ? " · Unpublished edits"
                  : ""}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
