export function isValidEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function isValidPhone(phone: string) {
  return /^\d{10,}$/.test(phone);
}

export function isStrongPassword(pw: string) {
  return pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
}

export function isValidReferral(code: string) {
  return /^[A-Za-z0-9]{4,}$/.test(code);
} 