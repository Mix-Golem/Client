import { Axios } from '../Axios';

export const CheckLike = async (songId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.get('/music/like', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        songId: songId,
      },
    });

    if (response.data.isSuccess && response.data.code === 200) {
      return response.data.result; //false면 이미 좋아요 누름, true면 아직 안누름
    } else {
      return {
        message: response.data.message || 'Failed to check like status.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to check like status:', error);
    return;
  }
};

export default CheckLike;
