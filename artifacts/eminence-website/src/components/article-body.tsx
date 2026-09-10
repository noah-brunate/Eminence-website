import React from "react";
// Deliberately limited formatting: React escapes all text; no executable HTML or embeds.
function inline(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        part
      ),
    );
}
export default function ArticleBody({ body }: { body: string }) {
  return (
    <>
      {body
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((block, i) => {
          if (block.startsWith("### "))
            return <h3 key={i}>{inline(block.slice(4))}</h3>;
          if (block.startsWith("## "))
            return <h2 key={i}>{inline(block.slice(3))}</h2>;
          if (block.startsWith("> "))
            return <blockquote key={i}>{inline(block.slice(2))}</blockquote>;
          if (block.split("\n").every((line) => line.startsWith("- ")))
            return (
              <ul key={i}>
                {block.split("\n").map((line, j) => (
                  <li key={j}>{inline(line.slice(2))}</li>
                ))}
              </ul>
            );
          return <p key={i}>{inline(block)}</p>;
        })}
    </>
  );
}
