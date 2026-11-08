/**
 * Passwordless Email OTP Authentication and User State Management
 * Allows customers to save their Wishlist and Order Bag linked exclusively to their email.
 */

import { OrderItem } from './whatsapp';

export interface UserAccountData {
  email: string;
  wishlist: string[];
  orderItems: OrderItem[];
  createdAt: number;
  lastLoginAt: number;
}

export interface PendingOtp {
  email: string;
  code: string;
  expiresAt: number;
  attempts: number;
}

const OTP_EXPIRY_MS = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 5;

/**
 * Validates basic email syntax
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim().toLowerCase());
}

/**
 * Generates a random 6-digit numeric string
 */
export function generateOtpCode(): string {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

/**
 * Validates an OTP code input against pending OTP
 */
export function validateOtpAttempt(
  pending: PendingOtp | null,
  submittedCode: string,
  now = Date.now()
): { success: boolean; error?: string } {
  if (!pending) {
    return { success: false, error: 'No hay un código pendiente. Solicita uno nuevo.' };
  }

  if (now > pending.expiresAt) {
    return { success: false, error: 'El código ha expirado. Solicita un nuevo código.' };
  }

  if (pending.attempts >= MAX_ATTEMPTS) {
    return { success: false, error: 'Demasiados intentos fallidos. Solicita un nuevo código.' };
  }

  const cleanSubmitted = submittedCode.replace(/\D/g, '').trim();
  if (cleanSubmitted !== pending.code) {
    return { success: false, error: 'Código incorrecto. Revisa los 6 dígitos.' };
  }

  return { success: true };
}

/**
 * Storage helpers for browser environments
 */
const ACTIVE_USER_KEY = 'kalon_active_user_email';
const PENDING_OTP_KEY = 'kalon_pending_otp';
const USERS_PREFIX = 'kalon_user_account_';

export function getActiveUserEmail(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(ACTIVE_USER_KEY);
  } catch {
    return null;
  }
}

export function setActiveUserEmail(email: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (email) {
      localStorage.setItem(ACTIVE_USER_KEY, email.trim().toLowerCase());
    } else {
      localStorage.removeItem(ACTIVE_USER_KEY);
    }
  } catch {
    // ignore
  }
}

export function savePendingOtp(pending: PendingOtp): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PENDING_OTP_KEY, JSON.stringify(pending));
  } catch {
    // ignore
  }
}

export function getPendingOtp(): PendingOtp | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PENDING_OTP_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearPendingOtp(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PENDING_OTP_KEY);
  } catch {
    // ignore
  }
}

/**
 * Creates or updates a pending OTP for a given email
 */
export function createPendingOtp(email: string, now = Date.now()): PendingOtp {
  const normalizedEmail = email.trim().toLowerCase();
  const code = generateOtpCode();
  const pending: PendingOtp = {
    email: normalizedEmail,
    code,
    expiresAt: now + OTP_EXPIRY_MS,
    attempts: 0,
  };
  savePendingOtp(pending);
  return pending;
}

/**
 * Retrieves saved user account data for an email
 */
export function getUserAccount(email: string): UserAccountData | null {
  if (typeof window === 'undefined') return null;
  try {
    const normalized = email.trim().toLowerCase();
    const raw = localStorage.getItem(`${USERS_PREFIX}${normalized}`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Persists user account data (wishlist + order items)
 */
export function saveUserAccount(data: UserAccountData): void {
  if (typeof window === 'undefined') return;
  try {
    const normalized = data.email.trim().toLowerCase();
    localStorage.setItem(`${USERS_PREFIX}${normalized}`, JSON.stringify(data));
  } catch {
    // ignore
  }
}

/**
 * Merges guest items with user's saved items upon login without duplicates
 */
export function mergeWishlist(guest: string[], userSaved: string[]): string[] {
  const set = new Set([...userSaved, ...guest]);
  return Array.from(set);
}

export function mergeOrderItems(guest: OrderItem[], userSaved: OrderItem[]): OrderItem[] {
  const merged: OrderItem[] = [...userSaved];

  for (const item of guest) {
    const existingIndex = merged.findIndex(
      (m) => m.id === item.id && m.size === item.size && m.color === item.color
    );
    if (existingIndex >= 0) {
      merged[existingIndex] = {
        ...merged[existingIndex],
        quantity: Math.max(merged[existingIndex].quantity, item.quantity),
      };
    } else {
      merged.push({ ...item });
    }
  }

  return merged;
}
