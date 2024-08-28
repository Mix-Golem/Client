import { Axios } from '../Axios';

export const postSignup = async (signupData) => {
  try {
    const response = await Axios.post('/users/signup', signupData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return {
      code: error.response?.data?.code || 500,
      message:
        error.response?.data?.message || 'An error occurred during signup.',
      isSuccess: false,
    };
  }
};
