import { Axios } from '../Axios';

export const CreatePlaylist = async (playlistTitle, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.post(
      '/music/playlist',
      {
        title: playlistTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle the response
    if (response.data.isSuccess && response.data.code === 200) {
      return response.data;
    } else {
      return {
        message: response.data.message || 'Failed to create playlist.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to create playlist:', error);
    return {
      message: 'An error occurred while creating the playlist.',
      success: false,
    };
  }
};

export default CreatePlaylist;
