import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../img/404.svg';
import { Theme } from '../styles/Theme.js';
import Button from '../components/LoginJoin/SmallButton';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <NotFoundContainer>
      <img src={NotFoundImage} alt='404 Not Found' />
      <NotFoundText>
        <div>Page not found</div>
        <div className='spacer'></div>
        <div>페이지를 찾을 수 없습니다</div>
      </NotFoundText>
      <ButtonWrapper>
        <Button onClick={handleGoHome}>Go Home</Button>
      </ButtonWrapper>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: ${Theme.colors.darkGray};
  color: ${Theme.colors.white};
`;

const NotFoundText = styled.div`
  margin-top: 20px;
  ${Theme.fonts.title}
  text-shadow: 2px 2px ${Theme.colors.lightGray};

  .spacer {
    margin: 15px 0;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;
