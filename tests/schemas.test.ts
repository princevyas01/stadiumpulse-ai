import { describe, it, expect } from 'vitest';
import { chatMessageSchema } from '@/lib/schemas';

describe('chatMessageSchema edge cases', () => {
  it('rejects empty message', () => {
    expect(chatMessageSchema.safeParse({ message: '' }).success).toBe(false);
  });
  it('rejects message over 500 characters', () => {
    expect(chatMessageSchema.safeParse({ message: 'a'.repeat(501) }).success).toBe(false);
  });
  it('accepts message at exactly 500 characters', () => {
    expect(chatMessageSchema.safeParse({ message: 'a'.repeat(500) }).success).toBe(true);
  });
});
