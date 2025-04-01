import { Axios } from '../Axios';

export const DeleteLike = async (songId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.delete('/music/dislike', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        songId: songId, // ID of the song to remove like from
      },
    });

    if (response.data.isSuccess && response.data.code === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Failed to remove like:', error);
    return {
      message: 'An error occurred while removing like.',
      success: false,
    };
  }
};

export default DeleteLike;
