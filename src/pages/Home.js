import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../styles/Theme';

function Home() {
  return (
    <ThemeProvider theme={Theme}>

    </ThemeProvider>
  )
}

export default Home

const LogoContainer = styled.div`
    width: 249px;
    height: 894px;
    background: #000000;
    border-radius: 70px;
`;

const CreditContainer = styled.div`
    background: #000000;
    border-radius: 70px;
    width: 249px;
    height: 93px;
`;

const StyledLogo = styled.img`
  width: 188px;
  margin-top: 75px;
  margin-left: 48px;
`;