import { Axios } from '../Axios';

export const checkEmailVerificationCode = async (cipherCode, code) => {
  try {
    const response = await Axios.post(
      '/users/signup/email/check-verification-code',
      {
        cipherCode,
        code,
      }
    );

    return response.data;
  } catch (error) {
    console.error('이메일 인증 확인 실패:', error);
    return {
      code: 'ERROR',
      message: '이메일 인증 확인 중 오류가 발생했습니다.',
      result: null,
      isSuccess: false,
    };
  }
};
