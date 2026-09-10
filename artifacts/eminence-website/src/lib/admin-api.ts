export async function adminApi<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await fetch("/api/admin" + path, {
    ...init,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...init.headers },
  });
  const data = await response
    .json()
    .catch(() => ({ error: "The server could not complete this request." }));
  if (response.status === 401)
    window.dispatchEvent(new Event("admin-session-expired"));
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}
