import { describe, it, expect } from 'vitest';
import { isRequired, isValidEmail, isValidPhone } from './validators';

describe('isRequired', () => {
  it('returns false for an empty string', () => {
    expect(isRequired('')).toBe(false);
  });

  it('returns false for a whitespace-only string', () => {
    expect(isRequired('   ')).toBe(false);
  });

  it('returns true for a non-empty string', () => {
    expect(isRequired('a')).toBe(true);
  });
});

describe('isValidEmail', () => {
  it('accepts a well-formed email', () => {
    expect(isValidEmail('a@b.com')).toBe(true);
  });

  it('rejects an email with no domain suffix', () => {
    expect(isValidEmail('a@b')).toBe(false);
  });

  it('rejects an email with no local part', () => {
    expect(isValidEmail('@b.com')).toBe(false);
  });

  it('rejects an email containing a space', () => {
    expect(isValidEmail('a b@c.com')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('accepts exactly 7 digits (the minimum length)', () => {
    expect(isValidPhone('1234567')).toBe(true);
  });

  it('rejects 6 characters (below the minimum length)', () => {
    expect(isValidPhone('123456')).toBe(false);
  });

  it('accepts a formatted phone number', () => {
    expect(isValidPhone('(555) 123-4567')).toBe(true);
  });

  it('accepts 7 dashes, documenting the permissive regex', () => {
    // isValidPhone only checks character class and length, not that any digits
    // are present — this is a real edge case the regex lets through.
    expect(isValidPhone('-------')).toBe(true);
  });

  it('rejects a string containing letters', () => {
    expect(isValidPhone('abc-defg')).toBe(false);
  });
});
