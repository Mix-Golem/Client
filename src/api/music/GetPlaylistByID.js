import { Axios } from '../Axios';

export const GetPlaylistByID = async (playlistId, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.get(`/music/playlist/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle the response
    if (response.data.isSuccess && response.data.code === 200) {
      return response.data;
    } else {
      return {
        message: response.data.message || 'Failed to fetch the playlist.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to fetch playlist:', error);
    return {
      message: 'An error occurred while fetching the playlist.',
      success: false,
    };
  }
};

export default GetPlaylistByID;
