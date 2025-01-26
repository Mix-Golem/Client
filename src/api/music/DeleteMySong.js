import { Axios } from '../Axios';

export const DeleteMySong = async (songData, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.delete('/music', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        songId: songData.id,
      },
    });

    if (response.data.isSuccess && response.data.code === 200) {
      console.log(response.data.message);
      return {
        message: 'Song deleted successfully!',
        success: true,
      };
    } else {
      return {
        message: response.data.message || 'Failed to delete song.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to delete song:', error);
    return {
      message: 'An error occurred while deleting the song.',
      success: false,
    };
  }
};

export default DeleteMySong;
