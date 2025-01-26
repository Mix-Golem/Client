import { Axios } from '../Axios';

export const RenameMySong = async (songData, newName, token) => {
  try {
    if (token === undefined) {
      return;
    }

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
