import { Axios } from '../Axios';

export const GetMySongByID = async (id, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.get(`/music/info/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.isSuccess && response.data.code === 200) {
      // console.log(response.data);
      return response.data; // 받을 때 response.result 뭐시기로 작업해야 됨
    } else {
      return {
        message: response.data.message || 'Failed to fetch the song.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to fetch song:', error);
    return {
      message: 'An error occurred while fetching the song.',
      success: false,
    };
  }
};

export default GetMySongByID;
