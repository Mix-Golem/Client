import { Axios } from '../Axios';
import Cookies from 'js-cookie';

export const CreateSong = async (prompt, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.post(
      '/suno/',
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Song request failed:', error);
    return {
      code: 'ERROR',
      message: 'An error occurred while generating the song.',
      result: null,
      isSuccess: false,
    };
  }
};

export default CreateSong;
