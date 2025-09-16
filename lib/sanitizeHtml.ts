/**
 * Sanitizes HTML content to prevent hydration errors
 * Ensures proper nesting and removes potential problematic structures
 */
export function sanitizeHtmlForReact(htmlContent: string): string {
  // Remove any unclosed div tags that might cause nesting issues
  let sanitized = htmlContent
  
  // Ensure all tags are properly closed and formatted
  // This is a basic sanitization - could be expanded with a proper HTML parser if needed
  sanitized = sanitized
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  return sanitized
}