import { Axios } from '../Axios';

export const Unfollow = async (followingId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.delete('/social/follow/unfollow', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        followingId: followingId, // The ID of the user to unfollow
      },
    });
    console.log('Unfollow response: ' + response);

    if (response.data.isSuccess && response.data.code === 200) {
      console.log('Successfully unfollow!');
      return {
        message: 'Unfollow successful!',
        success: true,
      };
    } else if (response.data.code === 'MEMBER4005') {
      return {
        message: 'This user is already unfollowed.',
        success: false,
      };
    } else {
      return {
        message: response.data.message || 'Failed to unfollow the user.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to unfollow user:', error);
    return {
      message: 'An error occurred while sending the unfollow request.',
      success: false,
    };
  }
};

export default Unfollow;
