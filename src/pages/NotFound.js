import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../img/404.svg';
import { Theme } from '../styles/Theme.js';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <img src={NotFoundImage} alt='404 Not Found' />
      <NotFoundText>
        <div>Page not found</div>
        <div>페이지를 찾을 수 없습니다</div>
      </NotFoundText>
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
  margin-top: 40px;
  ${Theme.fonts.title}
  text-shadow: 2px 2px ${Theme.colors.lightGray};
`;
