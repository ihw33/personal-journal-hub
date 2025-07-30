
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { success: boolean; message: string } => {
  if (password.length < 8) {
    return { success: false, message: '비밀번호는 8자 이상이어야 합니다.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { success: false, message: '비밀번호는 하나 이상의 대문자를 포함해야 합니다.' };
  }
  if (!/[a-z]/.test(password)) {
    return { success: false, message: '비밀번호는 하나 이상의 소문자를 포함해야 합니다.' };
  }
  if (!/[0-9]/.test(password)) {
    return { success: false, message: '비밀번호는 하나 이상의 숫자를 포함해야 합니다.' };
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return { success: false, message: '비밀번호는 하나 이상의 특수문자를 포함해야 합니다.' };
  }
  return { success: true, message: '유효한 비밀번호입니다.' };
};

export const validateName = (name: string): boolean => {
  // 이름에는 특수문자를 포함할 수 없습니다.
  const nameRegex = /^[a-zA-Z0-9가-힣\s]+$/;
  return nameRegex.test(name) && name.length > 1 && name.length < 50;
};
