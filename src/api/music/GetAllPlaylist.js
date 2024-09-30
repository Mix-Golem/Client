import { Axios } from '../Axios';

export const GetAllPlaylist = async () => {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXEiOnsiaWQiOjIsIm5hbWUiOiLsnbTrpoQiLCJwaG9uZW51bWJlciI6IjAxMDEyMzQ1Njc4IiwiYmlydGgiOiIyMDAwLTA2LTI0VDE1OjAwOjAwLjAwMFoiLCJnZW5kZXIiOiJNIiwiZW1haWwiOiJkYXJrbW9vbjYyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImhpZGRlbiIsImNyZWRpdCI6MCwicHJvZmlsZSI6bnVsbCwiaW50cm9kdWNlIjpudWxsLCJzb2NpYWxfcHJvdmlkZXIiOm51bGwsInJvbGUiOiJVU0VSIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDctMjlUMTU6MjU6NTMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA3LTI5VDE1OjI1OjUzLjAwMFoifSwiaWF0IjoxNzIyODYyODg2fQ.i2wnzwC6tTBSLxfvsRvGfQkulcf0r0hJ3yVu4PrqLIA';

    const response = await Axios.get('/music/playlist/user/playlists', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Handle the response
    if (response.data.isSuccess && response.data.code === 200) {
      return {
        playlists: response.data.result, // Array of playlists
        message: 'Playlists fetched successfully!',
        success: true,
      };
    } else {
      return {
        message: response.data.message || 'Failed to fetch playlists.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to fetch playlists:', error);
    return {
      message: 'An error occurred while fetching the playlists.',
      success: false,
    };
  }
};

export default GetAllPlaylist;
