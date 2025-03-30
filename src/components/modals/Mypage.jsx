import React from 'react';
import { useState, useEffect } from 'react';
import { Axios } from '../../api/Axios.js';
import styled, { ThemeProvider } from 'styled-components';
import profileImage from '../../img/profile.svg';
import stoneImage from '../../img/stone.svg';
import { Theme } from '../../styles/Theme.js';

import noprof from '../../img/nonprofile.png';

const Mypage = ({ show, onClose, onBack, tokens }) => {
  
    const [userInfo, setUserInfo] = useState({});
    const [credit, setCredit] = useState(0);
    const [profile, setProfile] = useState(noprof);

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
            // console.log(userInfo.profile);
            if(userInfo.profile !== undefined){
              setProfile(userInfo.profile);
            }
          });
  
          // 데이터를 상태에 저장
  
          console.log(userInfo);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchUserInfo();
    }, []);
    
  if (!show) {
    return null;
  }

  return (
    <ThemeProvider theme={Theme}>
      <ModalOverlay>
        <ModalContent>
          <CloseButton onClick={onClose}>X</CloseButton>
          <BackButton onClick={onBack}>&lt; Back</BackButton>
          <ProfileContainer>
            <ProfileImage src={profile} alt='Profile' />
            <ProfileDetails>
              <Title>{userInfo.name}</Title>
              <Subtitle>&quot;샤코, 오직 샤코&quot;</Subtitle>
              <ChangeButton>Change</ChangeButton>
            </ProfileDetails>
          </ProfileContainer>
          <Divider />
          <StoneTitle>Stone 충전</StoneTitle>
          <StoneContainer>
            <StoneItem>
              <StoneImage src={stoneImage} alt='Stone' />
              <StoneQuantity>100</StoneQuantity>
              <StonePrice>₩1000</StonePrice>
              <StoneBuyButton>Buy</StoneBuyButton>
            </StoneItem>
            <StoneItem>
              <StoneImage src={stoneImage} alt='Stone' />
              <StoneQuantity>500</StoneQuantity>
              <StonePrice>₩4500</StonePrice>
              <StoneBuyButton>Buy</StoneBuyButton>
            </StoneItem>
            <StoneItem>
              <StoneImage src={stoneImage} alt='Stone' />
              <StoneQuantity>1000</StoneQuantity>
              <StonePrice>₩8500</StonePrice>
              <StoneBuyButton>Buy</StoneBuyButton>
            </StoneItem>
          </StoneContainer>
        </ModalContent>
      </ModalOverlay>
    </ThemeProvider>
  );
};

export default Mypage;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.darkGray};
  border-radius: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  cursor: pointer;
`;

const BackButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ProfileDetails = styled.div`
  text-align: left;
  margin-left: 20px;
  flex-grow: 1;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.title};
  margin: 0;
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.fonts.label};
  margin: 5px 0;
`;

const ChangeButton = styled.button`
  ${({ theme }) => theme.fonts.button};
  background: ${({ theme }) => theme.colors.lightBlue};
  border: none;
  color: ${({ theme }) => theme.colors.white};
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${({ theme }) => theme.colors.darkBlue};
  }
`;

const Divider = styled.hr`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  margin: 20px 0;
`;

const StoneTitle = styled.h2`
  ${({ theme }) => theme.fonts.label};
  margin-bottom: 20px;
`;

const StoneContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StoneItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.lightGray};
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 30%;
`;

const StoneImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const StoneQuantity = styled.p`
  ${({ theme }) => theme.fonts.list};
  margin-bottom: 5px;
`;

const StonePrice = styled.p`
  ${({ theme }) => theme.fonts.footerText};
  margin-bottom: 10px;
`;

const StoneBuyButton = styled.button`
  ${({ theme }) => theme.fonts.button};
  background: ${({ theme }) => theme.colors.lightBlue};
  border: none;
  color: ${({ theme }) => theme.colors.white};
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s, transform 0.3s;
  &:hover {
    background: ${({ theme }) => theme.colors.darkBlue};
    transform: scale(1.05);
  }
`;
