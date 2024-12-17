import { Axios } from '../Axios';

export const Unfollow = async (followingId) => {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXEiOnsiaWQiOjE2LCJuYW1lIjoi7YOI7Ye0IO2FjOyKpO2KuCIsInBob25lbnVtYmVyIjoiMDEwMTIzNDU2NzgiLCJiaXJ0aCI6IjIwMDAtMDYtMjRUMTU6MDA6MDAuMDAwWiIsImdlbmRlciI6Ik0iLCJlbWFpbCI6ImRhcmttb29uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiaGlkZGVuIiwiY3JlZGl0IjoyMDAsInByb2ZpbGUiOiJodHRwOi8vdDEua2FrYW9jZG4ubmV0L2FjY291bnRfaW1hZ2VzL2RlZmF1bHRfcHJvZmlsZS5qcGVnLnR3Zy50aHVtYi5SNjQweDY0MCIsImludHJvZHVjZSI6bnVsbCwic29jaWFsX3Byb3ZpZGVyIjpudWxsLCJyb2xlIjoiVVNFUiIsImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTI1VDA1OjU3OjM2LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOC0yNVQwNTo1NzozNi4wMDBaIiwid2l0aGRyYXdfYXQiOm51bGwsIndpdGhkcmF3X3N0YXR1cyI6MH0sImlhdCI6MTcyNzYwNTUyNn0.wRFBmXGIMxLgfLJ8gut-n1kWCxNS6PYUzzxpkyaLbEQ';

    const response = await Axios.delete('/social/follow/unfollow', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        followingId: followingId, // The ID of the user to unfollow
      },
    });
    console.log('Unfollow response: ' + response);

    if (response.data.isSuccess && response.data.code === 200) {
      console.log('Successfully unfollow!');
      return {
        message: 'Unfollow successful!',
        success: true,
      };
    } else if (response.data.code === 'MEMBER4005') {
      return {
        message: 'This user is already unfollowed.',
        success: false,
      };
    } else {
      return {
        message: response.data.message || 'Failed to unfollow the user.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Failed to unfollow user:', error);
    return {
      message: 'An error occurred while sending the unfollow request.',
      success: false,
    };
  }
};

export default Unfollow;
