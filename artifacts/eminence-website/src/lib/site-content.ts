import { useQuery } from "@tanstack/react-query";
export function useSiteCopy(scope: string) {
  const { data } = useQuery<Record<string, Record<string, string>>>({
    queryKey: ["site-pages"],
    queryFn: async () => {
      const response = await fetch("/api/site/pages");
      if (!response.ok) throw new Error("Site content could not be loaded");
      return response.json();
    },
    staleTime: 30000,
    refetchInterval: 60000,
  });
  return (key: string, fallback: string): string =>
    data?.[scope]?.[key] ?? fallback;
}
