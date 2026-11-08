import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  generateOtpCode,
  validateOtpAttempt,
  mergeWishlist,
  mergeOrderItems,
  PendingOtp,
} from './auth';

test('isValidEmail accepts valid email formats', () => {
  assert.equal(isValidEmail('cliente@gmail.com'), true);
  assert.equal(isValidEmail('user.name+tag@example.co'), true);
  assert.equal(isValidEmail('kalon@streetwear.com'), true);
});

test('isValidEmail rejects invalid email formats', () => {
  assert.equal(isValidEmail(''), false);
  assert.equal(isValidEmail('invalid-email'), false);
  assert.equal(isValidEmail('missing@domain'), false);
  assert.equal(isValidEmail('@example.com'), false);
});

test('generateOtpCode generates 6-digit numeric strings', () => {
  for (let i = 0; i < 20; i++) {
    const code = generateOtpCode();
    assert.equal(code.length, 6);
    assert.match(code, /^\d{6}$/);
  }
});

test('validateOtpAttempt verifies code correctly', () => {
  const pending: PendingOtp = {
    email: 'test@kalon.com',
    code: '123456',
    expiresAt: Date.now() + 60000,
    attempts: 0,
  };

  const validResult = validateOtpAttempt(pending, '123456');
  assert.equal(validResult.success, true);

  const invalidResult = validateOtpAttempt(pending, '654321');
  assert.equal(invalidResult.success, false);
  assert.equal(invalidResult.error, 'Código incorrecto. Revisa los 6 dígitos.');
});

test('validateOtpAttempt handles expired codes', () => {
  const expiredPending: PendingOtp = {
    email: 'test@kalon.com',
    code: '123456',
    expiresAt: Date.now() - 1000,
    attempts: 0,
  };

  const result = validateOtpAttempt(expiredPending, '123456');
  assert.equal(result.success, false);
  assert.equal(result.error, 'El código ha expirado. Solicita un nuevo código.');
});

test('validateOtpAttempt handles exceeded attempts', () => {
  const lockedPending: PendingOtp = {
    email: 'test@kalon.com',
    code: '123456',
    expiresAt: Date.now() + 60000,
    attempts: 5,
  };

  const result = validateOtpAttempt(lockedPending, '123456');
  assert.equal(result.success, false);
  assert.equal(result.error, 'Demasiados intentos fallidos. Solicita un nuevo código.');
});

test('mergeWishlist combines guest items without duplicates', () => {
  const guest = ['prod-1', 'prod-2'];
  const user = ['prod-2', 'prod-3'];
  const merged = mergeWishlist(guest, user);
  assert.deepEqual(merged.sort(), ['prod-1', 'prod-2', 'prod-3'].sort());
});

test('mergeOrderItems merges quantities and unique items', () => {
  const guest = [
    { id: '1', name: 'Tee', code: 'KLN-1', price: 500, size: 'M', color: 'Black', quantity: 2 },
    { id: '2', name: 'Hoodie', code: 'KLN-2', price: 900, size: 'L', color: 'White', quantity: 1 },
  ];
  const user = [
    { id: '1', name: 'Tee', code: 'KLN-1', price: 500, size: 'M', color: 'Black', quantity: 1 },
    { id: '3', name: 'Jersey', code: 'KLN-3', price: 600, size: 'XL', color: 'Black', quantity: 1 },
  ];

  const merged = mergeOrderItems(guest, user);
  assert.equal(merged.length, 3);
  const tee = merged.find((m) => m.id === '1');
  assert.equal(tee?.quantity, 2);
  const hoodie = merged.find((m) => m.id === '2');
  assert.equal(hoodie?.quantity, 1);
  const jersey = merged.find((m) => m.id === '3');
  assert.equal(jersey?.quantity, 1);
});
