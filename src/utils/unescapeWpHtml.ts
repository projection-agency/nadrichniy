/**
 * WordPress sometimes stores HTML as escaped text (&lt;a&gt;...),
 * so tags appear as plain text in the browser. Unescape once when needed.
 */
export function unescapeWpHtml(html: string): string {
  if (!html) return "";

  let result = html;
  // Decode repeatedly while escaped tags are present (handles double-escape).
  for (let i = 0; i < 3; i++) {
    if (!/&lt;\/?[a-z]|&#0*60;\/?[a-z]/i.test(result)) {
      break;
    }
    if (typeof document !== "undefined") {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = result;
      result = textarea.value;
    } else {
      result = result
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&amp;/g, "&");
    }
  }

  return result;
}

export default unescapeWpHtml;
