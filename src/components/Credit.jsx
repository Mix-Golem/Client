import { React, useEffect, useState } from 'react';
import { Theme } from '../styles/Theme';
import styled from 'styled-components';
// import axios from 'axios'
import { Axios } from '../api/Axios';
import Cookies from 'js-cookie';

import user from '../img/GuideLogo.png';
import Mypage from './modals/Mypage';
import noprof from '../img/nonprofile.png';

function Credit({ login}) {
  const [userInfo, setUserInfo] = useState({});
  const [credit, setCredit] = useState(0);
  const [profile, setProfile] = useState(noprof);

  const tokens = Cookies.get('token');
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = tokens;

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
          console.log(userInfo.profile);
          if(userInfo.profile !== undefined){
            setProfile(userInfo.profile);
          }
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

  // useEffect(() => {}, [userInfo]);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  function handleLogin() {
    window.location.href = "/users/login";
  }
  return (
    <CreditContainer onClick={toggleModal}>
      {tokens && (
        <>
          <img
            style={{ width: '60px', height: '60px', borderRadius: '50px' }}
            // src={`${userInfo.profile}` || noprof}
            src={profile}
            alt='profile'
          />
          <Creditmoney>{userInfo.credit} credits</Creditmoney>
          <Mypage show={showModal} onClose={toggleModal} tokens={tokens}/>
        </>
      )}
      {tokens === undefined &&(
        <NotLoginContainer onClick={handleLogin}>login/signin</NotLoginContainer>
      )
      }
    </CreditContainer>
  );
}

export default Credit;

const CreditContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor:pointer;
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

const NotLoginContainer = styled.div`
position: relative;
display: flex;
  ${Theme.fonts.credit}
  color: ${Theme.colors.white};
`