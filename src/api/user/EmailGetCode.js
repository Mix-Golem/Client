import { Axios } from '../Axios';

export const sendEmailVerificationCode = async (email) => {
  try {
    const response = await Axios.get(
      '/users/signup/email/send-verification-code',
      {
        params: { email },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending email verification code:', error);
    throw error;
  }
};
