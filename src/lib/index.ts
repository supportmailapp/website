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

/**
 * Format a large number with commas and a '+' sign.
 * For example, 1234567 becomes "1,234,500+"
 *
 * @param num - The number to format.
 * @param step - The step to round down to. Default is 100.
 * @returns The formatted number as a string.
 */
export function formatNumber(num: number, step = 100) {
  // Round down to nearest step
  const roundedNum = Math.floor(num / step) * step;

  // Format with commas + '+'
  return roundedNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "+";
}
