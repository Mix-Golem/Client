import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Theme } from '../styles/Theme';
import GlobalStyle from '../styles/GlobalStyle';

import nonmain from '../img/notLoginMain.png';
import t1 from '../img/t1.jpg';
import background from '../img/background.png';

import SideMenu  from '../components/SideMenu';
import Profile from '../components/Profile';
import Playlist from '../components/Playlist';
import TopRank from '../components/TopRank';


function Home() {
  // const firstmusic = ;
  // const secmusic = ;
  // const trdmusic = ;

  const [login, setLogin] = useState(false);

  const [backimg, setBackimg] = useState(t1);
  return (
    <ThemeProvider theme={Theme}>
        <GlobalStyle/>
        <FieldWrapper>
          <SideMenu/>
          <MainField>
            
          </MainField>
          <Profile/>
          <Playlist/>
          <TopRank/>
        </FieldWrapper>
    </ThemeProvider>
  )
}

export default Home

const FieldWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: ${Theme.colors.darkGray};
  overflow: hidden;
`

const MainField = styled.div`
margin-top: 38px;
 /* display: flex; */
 position: relative;
 /* overflow: visible; */
 z-index: 1;
 width: 1615px;
 height: 1000px;
 margin-left: 45px;

 -webkit-mask-image: url(${background});
  mask-image: url(${background});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;

  background-image: url(${t1});
  background-size: cover;
  z-index: 0;
  
  
  img{
    background-size: none;
  }
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
