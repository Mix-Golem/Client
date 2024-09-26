import { Axios } from '../Axios';

export const CreateSong = async (token, prompt) => {
  try {
    const response = await Axios.post(
      '/suno/',
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
          Connection: 'keep-alive',
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
