import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sanitizes user input to prevent common prompt injection patterns and XSS.
 * @param input The raw user input string.
 * @returns A sanitized version of the input.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  
  // Pattern to catch prompt injection attempts
  const injectionPattern = /\b(ignore|override|bypass|reset)\s+.*(instructions|directives|prompts|system)\b/gi;
  
  const sanitized = input.replace(/[<>]/g, ""); // Remove < and >
  
  if (injectionPattern.test(sanitized)) {
    return "[REDACTED]";
  }
  
  return sanitized.trim();
}

/**
 * Formats a number with a thousand separator.
 */
export function formatNumber(num: number | string): string {
  const n = typeof num === "string" ? parseFloat(num) : num;
  return new Intl.NumberFormat("id-ID").format(n);
}
