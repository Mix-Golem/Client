import { Axios } from '../Axios';

export const SaveSong = async (songData, token) => {
  try {
    // const token = Cookies.get('token');
    // console.log('token = ' + token);
    if (token === undefined) {
      return;
    }

    const response = await Axios.post(
      '/music',
      {
        title: songData.title,
        about: songData.about,
        prompt: songData.prompt,
        media: songData.media,
        genre: songData.genre,
        thumbnail: songData.thumbnail,
        lyrics: songData.lyrics,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Song saving request failed:', error);
    return {
      code: 'ERROR',
      message: 'An error occurred while saving the song.',
      result: null,
      isSuccess: false,
    };
  }
};

export default SaveSong;
