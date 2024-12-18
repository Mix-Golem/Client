import React from 'react'
import styled from 'styled-components'
import { Theme } from '../styles/Theme'

import noticeIcon from '../img/notice.png'
import GuideLogo from '../img/GuideLogo.png'
function Profile() {

    function handleGuideClick(){
        window.location.href = "/Guide";
    }
  return (
    <FieldWrapper>
        <GuideGIcon onClick={handleGuideClick}/>
        <NoticeIcon/>
    </FieldWrapper>
  )
}

export default Profile

const FieldWrapper = styled.div`
    top: 47px;
    position: absolute;
    left: 1695px;
    z-index: 2;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 175px;
    height: 70px;
    gap: 20px;
    border-radius: 70px;
    background: ${Theme.colors.lightBlue};
`

const GuideGIcon = styled.div`
    width: 50px;
    height: 50px;
    background: url(${GuideLogo}) center ;
    cursor: pointer;
`

const NoticeIcon = styled.div`
    width: 50px;
    height: 50px;
    background: url(${noticeIcon}) center ;
    cursor: pointer;
`
