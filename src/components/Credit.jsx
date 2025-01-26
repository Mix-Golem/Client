import { React, useEffect, useState } from 'react';
import { Theme } from '../styles/Theme';
import styled from 'styled-components';
// import axios from 'axios'
import { Axios } from '../api/Axios';

import user from '../img/GuideLogo.png';
import Mypage from './modals/Mypage';

function Credit({ login, tokens }) {
  const [userInfo, setUserInfo] = useState({});
  const [credit, setCredit] = useState(0);
  const [profile, setProfile] = useState(user);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = tokens;
      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXEiOnsiaWQiOjE2LCJuYW1lIjoi7YOI7Ye0IO2FjOyKpO2KuCIsInBob25lbnVtYmVyIjoiMDEwMTIzNDU2NzgiLCJiaXJ0aCI6IjIwMDAtMDYtMjRUMTU6MDA6MDAuMDAwWiIsImdlbmRlciI6Ik0iLCJlbWFpbCI6ImRhcmttb29uQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiaGlkZGVuIiwiY3JlZGl0IjoyMDAsInByb2ZpbGUiOiJodHRwOi8vdDEua2FrYW9jZG4ubmV0L2FjY291bnRfaW1hZ2VzL2RlZmF1bHRfcHJvZmlsZS5qcGVnLnR3Zy50aHVtYi5SNjQweDY0MCIsImludHJvZHVjZSI6bnVsbCwic29jaWFsX3Byb3ZpZGVyIjpudWxsLCJyb2xlIjoiVVNFUiIsImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTI1VDA1OjU3OjM2LjAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOC0yNVQwNTo1NzozNi4wMDBaIiwid2l0aGRyYXdfYXQiOm51bGwsIndpdGhkcmF3X3N0YXR1cyI6MH0sImlhdCI6MTcyNzYwNTUyNn0.wRFBmXGIMxLgfLJ8gut-n1kWCxNS6PYUzzxpkyaLbEQ';

      try {
        if (token === undefined) {
          return;
        }

        const response = await Axios.get('/users/info', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          console.log(response.data.result);
          setUserInfo(response.data.result);
        });

        // 데이터를 상태에 저장

        console.log(userInfo);
        // setCredit(userInfo.credit);
        // setProfile(userInfo.profile);
        // setLoading(false);
      } catch (err) {
        // setError(err.message);
        // setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {}, [userInfo]);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <CreditContainer onClick={toggleModal}>
      {userInfo && (
        <>
          <img
            style={{ width: '60px', height: '60px', borderRadius: '50px' }}
            src={`${userInfo.profile}`}
            alt='profile'
          />
          <Creditmoney>{userInfo.credit} credits</Creditmoney>
          <Mypage show={showModal} onClose={toggleModal} />
        </>
      )}
    </CreditContainer>
  );
}

export default Credit;

const CreditContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: 249px;
  height: 93px;
  left: 18px;
  top: 950px;

  background: ${Theme.colors.black};
  border-radius: 70px;
`;
const Creditmoney = styled.div`
  ${Theme.fonts.credit};
  color: ${Theme.colors.white};
`;
