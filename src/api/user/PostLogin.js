import { Axios } from '../Axios';

export const postLogin = async (email, password) => {
  try {
    const response = await Axios.post(
      '/users/login',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.isSuccess) {
      return {
        success: true,
        token: response.data.result,
      };
    } else {
      return {
        success: false,
        message: response.data.message,
      };
    }
  } catch (error) {
    console.error('로그인 요청 중 오류 발생:', error);
    return {
      success: false,
      message: error.response?.data?.message || '로그인에 실패했습니다.',
    };
  }
};
