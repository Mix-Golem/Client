import { Axios } from '../Axios';

export const PostLike = async (songId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.post(
      '/music/like',
      {
        songId: songId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle success
    if (response.data.isSuccess && response.data.code === 200) {
      return response.data;
    } else {
      return {
        message: response.data.message || 'Failed to like the song.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to send like:', error);
    return {
      message: 'An error occurred while liking the song.',
      success: false,
    };
  }
};

export default PostLike;
