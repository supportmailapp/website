import { redirect as svRedirect } from "@sveltejs/kit";
import { m } from "./paraglide/messages";
import z from "zod";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function markdownToHtml(markdown: string, infoLink = false): string {
  if (typeof markdown !== "string") return "";

  let html = markdown.replace(/\\n/g, "<br />");
  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italics: *text* or _text_
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  html = html.replace(/_([^_]+)_/g, "<em>$1</em>");

  // Underline: __text__
  html = html.replace(/__([^_]+)__/g, "<u>$1</u>");

  // Link: [text](url)
  // Note: This regex does not support nested brackets or parentheses
  // and will not work for all edge cases. Use with caution.
  html = html.replace(
    /\[([^\]]+)\]\(([^) ]+)\)/gi,
    `<a href="$2" class="link link-${infoLink ? "info" : "primary"} link-hover" target="_blank">$1</a>`,
  );

  // Line break: \n
  html = html.replace(/\\n/g, "<br />");

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

// Helper function to safely access dynamic message keys - utility function first
export const getMessage = (key: string) => {
  return ((m as unknown as Record<string, Function>)[key] || (() => key)) as () => string;
};

export function redirectToLoginWithError(errStr: string, status: number = 302): never {
  return svRedirect(status, "/login?error=" + encodeURIComponent(errStr));
}

type CachingType = "sessiontoken" | "userroles";

export function makeCacheKey(type: CachingType, ...args: string[]): string {
  return [type, ...args].join(":");
}

// Schema for appealing bans
const appeal = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(100, { message: "Name must be at most 100 characters long." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." })
    .max(1000, { message: "Description must be at most 1000 characters long." }),
  messageLink: z.url({ message: "Message link must be a valid URL." }).optional(),
  captchaToken: z.string().min(1, { message: "Captcha token is required." }),
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
