export async function generateCsrfToken(): Promise<string> {
  const raw = crypto.randomUUID();
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(process.env.CSRF_SECRET || 'dev-only-fallback-change-in-production'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  const signature = await crypto.subtle.sign('HMAC', keyMaterial, encoder.encode(raw));
  const sigHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${raw}.${sigHex}`;
}

export async function verifyCsrfToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !token.includes('.')) return false;
  const [raw, signature] = token.split('.');
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(process.env.CSRF_SECRET || 'dev-only-fallback-change-in-production'),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
  const expectedSignature = await crypto.subtle.sign('HMAC', keyMaterial, encoder.encode(raw));
  const expectedSigHex = Array.from(new Uint8Array(expectedSignature)).map(b => b.toString(16).padStart(2, '0')).join('');
  return signature === expectedSigHex;
}
