import { Axios } from '../Axios';

export const AddSongToPlaylist = async (playlistId, songId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.post(
      `/music/playlist/${playlistId}/songs`,
      {
        songId: songId, // The ID of the song to add
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
        message: response.data.message || 'Failed to add song to the playlist.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to add song to playlist:', error);
    return {
      message: 'An error occurred while adding the song to the playlist.',
      success: false,
    };
  }
};

export default AddSongToPlaylist;
