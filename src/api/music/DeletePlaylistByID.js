import { Axios } from '../Axios';

export const DeletePlaylistByID = async (playlistId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.delete(`/music/playlist/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle the response
    if (response.data.isSuccess && response.data.code === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Failed to delete playlist:', error);
    return {
      message: 'An error occurred while deleting the playlist.',
      success: false,
    };
  }
};

export default DeletePlaylistByID;
