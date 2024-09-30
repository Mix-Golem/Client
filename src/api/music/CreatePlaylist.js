import { Axios } from '../Axios';

export const CreatePlaylist = async (playlistTitle) => {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXEiOnsiaWQiOjIsIm5hbWUiOiLsnbTrpoQiLCJwaG9uZW51bWJlciI6IjAxMDEyMzQ1Njc4IiwiYmlydGgiOiIyMDAwLTA2LTI0VDE1OjAwOjAwLjAwMFoiLCJnZW5kZXIiOiJNIiwiZW1haWwiOiJkYXJrbW9vbjYyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImhpZGRlbiIsImNyZWRpdCI6MCwicHJvZmlsZSI6bnVsbCwiaW50cm9kdWNlIjpudWxsLCJzb2NpYWxfcHJvdmlkZXIiOm51bGwsInJvbGUiOiJVU0VSIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDctMjlUMTU6MjU6NTMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA3LTI5VDE1OjI1OjUzLjAwMFoifSwiaWF0IjoxNzIyODYyODg2fQ.i2wnzwC6tTBSLxfvsRvGfQkulcf0r0hJ3yVu4PrqLIA';

    const response = await Axios.post(
      '/music/playlist',
      {
        title: playlistTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle the response
    if (response.data.isSuccess && response.data.code === 200) {
      return {
        playlistId: response.data.result, // Playlist ID returned by the API
        message: 'Playlist created successfully!',
        success: true,
      };
    } else {
      return {
        message: response.data.message || 'Failed to create playlist.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to create playlist:', error);
    return {
      message: 'An error occurred while creating the playlist.',
      success: false,
    };
  }
};

export default CreatePlaylist;
