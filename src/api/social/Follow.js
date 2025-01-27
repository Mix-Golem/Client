import { Axios } from '../Axios';

export const Follow = async (followingId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.post(
      '/social/follow/follower',
      {
        followingId: followingId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Follow response: ' + response);

    if (response.data.isSuccess && response.data.code === 200) {
      console.log('Successfully follow!');
      return {
        message: 'Follow request successful!',
        success: true,
      };
    } else if (response.data.code === 'MEMBER4004') {
      return {
        message: 'This user is already followed.',
        success: false,
      };
    } else {
      return {
        message: response.data.message || 'Failed to send follow request.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to send follow request:', error);
    return {
      message: 'An error occurred while sending the follow request.',
      success: false,
    };
  }
};

export default Follow;
