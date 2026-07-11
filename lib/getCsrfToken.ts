// sp_csrf is intentionally NOT httpOnly (see middleware.ts) specifically so client code can read it here.
export function getCsrfToken(): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/(?:^|; )sp_csrf=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : ''
}
