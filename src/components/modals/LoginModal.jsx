import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import LogoImage from '../img/logo.svg'; // Replace with your actual logo path

const LoginModal = ({ onClose, onLogin }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <LogoWrapper>
          <img src={LogoImage} alt='Logo' />
        </LogoWrapper>
        <Message>로그인해야 이용할 수 있습니다</Message>
        <LoginButton onClick={onLogin}>Login</LoginButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LoginModal;

// Styled Components
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
  padding: 20px 30px;
  background: ${Theme.colors.darkGray};
  border-radius: 12px;
  text-align: center;
  color: ${Theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: ${Theme.colors.white};
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: ${Theme.colors.gray};
  }
`;

const LogoWrapper = styled.div`
  margin: 20px auto;
  img {
    width: 100px;
    height: auto;
  }
`;

const Message = styled.p`
  margin: 20px 0;
  font-size: 18px;
  color: ${Theme.colors.white};
`;

const LoginButton = styled.button`
  width: 100%;
  max-width: 200px;
  padding: 10px 0;
  background: ${Theme.colors.lightGray};
  border: none;
  border-radius: 8px;
  color: ${Theme.colors.white};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: ${Theme.colors.gray};
  }
`;
