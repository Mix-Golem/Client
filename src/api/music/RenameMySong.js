import { Axios } from '../Axios';

export const RenameMySong = async (songData, newName) => {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXEiOnsiaWQiOjIsIm5hbWUiOiLsnbTrpoQiLCJwaG9uZW51bWJlciI6IjAxMDEyMzQ1Njc4IiwiYmlydGgiOiIyMDAwLTA2LTI0VDE1OjAwOjAwLjAwMFoiLCJnZW5kZXIiOiJNIiwiZW1haWwiOiJkYXJrbW9vbjYyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImhpZGRlbiIsImNyZWRpdCI6MCwicHJvZmlsZSI6bnVsbCwiaW50cm9kdWNlIjpudWxsLCJzb2NpYWxfcHJvdmlkZXIiOm51bGwsInJvbGUiOiJVU0VSIiwiY3JlYXRlZF9hdCI6IjIwMjQtMDctMjlUMTU6MjU6NTMuMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA3LTI5VDE1OjI1OjUzLjAwMFoifSwiaWF0IjoxNzIyODYyODg2fQ.i2wnzwC6tTBSLxfvsRvGfQkulcf0r0hJ3yVu4PrqLIA';

    const response = await Axios.post(
      '/music/change-info',
      {
        id: songData.id,
        title: newName,
        public: songData.public, // true or false
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
        message: 'Song info updated successfully!',
        success: true,
      };
    } else {
      return {
        message: response.data.message || 'Failed to update song info.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to update song info:', error);
    return {
      message: 'An error occurred while updating the song info.',
      success: false,
    };
  }
};

export default RenameMySong;
