export const checkPasswordStrength = (password: string) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  const isLengthValid = password.length >= 8;

  const criteriaMet = [hasUppercase, hasLowercase, hasDigit, hasSpecialChar, isLengthValid].filter(Boolean).length;

  if (criteriaMet === 5) return 4;
  if (criteriaMet >= 4) return 3;
  if (criteriaMet >= 2) return 2;
  if (criteriaMet >= 1) return 1;

  return 0;
};

export default checkPasswordStrength;
