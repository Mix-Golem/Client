import { Axios } from '../Axios';

export const GetFollowList = async () => {
  try {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXEiOnsiaWQiOjE2LCJuYW1lIjoi7YOI7Ye0IO2FjOyKpO2KuCIsInBob25lbnVtYmVyIjoiMDEwMTIzNDU2NzgiLCJiaXJ0aCI6IjIwMDAtMDYtMjRUMTU6MDA6MDAuMDAwWiIsImdlbmRlciI6Ik0iLCJlbWFpbCI6ImRhcmttb29uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiaGlkZGVuIiwiY3JlZGl0IjoyMDAsInByb2ZpbGUiOiJodHRwOi8vdDEua2FrYW9jZG4ubmV0L2FjY291bnRfaW1hZ2VzL2RlZmF1bHRfcHJvZmlsZS5qcGVnLnR3Zy50aHVtYi5SNjQweDY0MCIsImludHJvZHVjZSI6bnVsbCwic29jaWFsX3Byb3ZpZGVyIjpudWxsLCJyb2xlIjoiVVNFUiIsImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTI1VDA1OjU3OjM2LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOC0yNVQwNTo1NzozNi4wMDBaIiwid2l0aGRyYXdfYXQiOm51bGwsIndpdGhkcmF3X3N0YXR1cyI6MH0sImlhdCI6MTcyNzYwNTUyNn0.wRFBmXGIMxLgfLJ8gut-n1kWCxNS6PYUzzxpkyaLbEQ';

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
