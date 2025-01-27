import { Axios } from '../Axios';

export const DeleteSongInPlaylist = async (playlistId, songId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.delete(
      `/music/playlist/${playlistId}/songs/${songId}`,
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
        message:
          response.data.message ||
          'Failed to remove the song from the playlist.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to remove song from playlist:', error);
    return {
      message: 'An error occurred while removing the song from the playlist.',
      success: false,
    };
  }
};

export default DeleteSongInPlaylist;
