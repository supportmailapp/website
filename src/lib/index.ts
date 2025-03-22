export function markdownToHtml(markdown: string): string {
  if (!markdown) return "";

  let html = markdown.replace(/\\n/g, "<br />");
  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italics: *text* or _text_
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Underline: __text__
  html = html.replace(/__([^_]+)__/g, "<u>$1</u>");

  html = html.replace(
    /\[([^\]]+)\]\(([^) ]+)\)/gi,
    '<a href="$2" class="link link-primary link-hover" target="_blank" rel="noopener noreferrer">$1</a>',
  );

  return html;
}
