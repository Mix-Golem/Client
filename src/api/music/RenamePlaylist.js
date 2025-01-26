import { Axios } from '../Axios';

export const renamePlaylist = async (playlistId, newTitle, token) => {
  try {
    if (token === undefined) {
      return;
    }

    const response = await Axios.put(
      `/music/playlist/${playlistId}`,
      {
        title: newTitle,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.isSuccess && response.data.code === 200) {
      console.log('Rename playlist successfully');
      return {
        message:
          response.data.result.message || 'Playlist renamed successfully!',
        success: true,
      };
    } else {
      return {
        message: response.data.message || 'Failed to rename the playlist.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to rename playlist:', error);
    return {
      message: 'An error occurred while renaming the playlist.',
      success: false,
    };
  }
};

export default renamePlaylist;
