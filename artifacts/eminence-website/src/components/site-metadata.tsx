import { useEffect } from "react";
import { useSiteCopy } from "@/lib/site-content";
export default function SiteMetadata() {
  const copy = useSiteCopy("seo");
  const title = copy("title", "EMINENCE Website");
  const description = copy(
    "description",
    "EMINENCE Website — built on Replit. Update this description to reflect the app.",
  );
  useEffect(() => {
    document.title = title;
    for (const [selector, value] of [
      ["meta[name='description']", description],
      ["meta[property='og:title']", title],
      ["meta[property='og:description']", description],
      ["meta[name='twitter:title']", title],
      ["meta[name='twitter:description']", description],
    ])
      document.querySelector(selector)?.setAttribute("content", value);
  }, [title, description]);
  return null;
}
