import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../styles/Theme';
import GlobalStyle from '../styles/GlobalStyle';

import SideMenu  from '../components/SideMenu';

function Home() {
  // const firstmusic = ;
  // const secmusic = ;
  // const trdmusic = ;
  return (
    <ThemeProvider theme={Theme}>
        <GlobalStyle/>
        <FieldWrapper>
          <SideMenu/>
        </FieldWrapper>
    </ThemeProvider>
  )
}

export default Home

const FieldWrapper = styled.div`
  display: grid;
  height: 100vh;
`


const CreditContainer = styled.div`
    background: #000000;
    border-radius: 70px;
    width: 249px;
    height: 93px;
`;

const ChartContainer = styled.div`
  display: flex;
`

const fstmusic = styled.img`
 display: flex;
 background: url({}) no-repeat center center/cover;
`
const secmusic = styled.img`
  display:flex;
  background: url({}) no-repeat center center/cover;
`
const trdmusic = styled.img`
  display: flex;
  background: url({}) no-repeat center center/cover;
`
