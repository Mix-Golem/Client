import { Axios } from '../Axios';

export const GetHistory = async (token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.get('/music/history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle the response
    if (response.data.isSuccess && response.data.code === 200) {
      return response.data;
    } else {
      return {
        message: response.data.message || 'Failed to fetch history.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to fetch history:', error);
    return {
      message: 'An error occurred while fetching the history.',
      success: false,
    };
  }
};

export default GetHistory;
