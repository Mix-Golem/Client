import { Axios } from '../Axios';

export const GetFollowList = async (token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.get('/social/info/followlist', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.data.isSuccess && response.data.code === 200) {
      // console.log(response.data);
      return response.data; // 받을 때 response.result로 사용
    } else {
      return {
        message: response.data.message || 'Failed to fetch the follow list.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to fetch follow list:', error);
    return {
      message: 'An error occurred while fetching the follow list.',
      success: false,
    };
  }
};

export default GetFollowList;
