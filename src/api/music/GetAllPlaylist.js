import { Axios } from '../Axios';

export const GetAllPlaylist = async (token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.get('/music/playlist/user/playlists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.isSuccess && response.data.code === 200) {
      return response.data;
    } else {
      return {
        message: response.data.message || 'Failed to fetch playlists.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to fetch playlists:', error);
    return {
      message: 'An error occurred while fetching the playlists.',
      success: false,
    };
  }
};

export default GetAllPlaylist;
