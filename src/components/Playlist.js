import React from 'react'
import styled from 'styled-components'
import { Theme } from '../styles/Theme'

import PL from '../img/playlist.png'

function Playlist() {
  return (
    <FieldWrapper>
        
    </FieldWrapper>
  )
}

export default Playlist

const FieldWrapper = styled.div`
    position: absolute;
    display: inline-block;
    z-index: 3;
    width: 401px;
    height: 278px;
    left: 312px;
    top: 765px;

 -webkit-mask-image: url(${PL});
  mask-image: url(${PL});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
 

 /* border-right: 20px solid transparent;
 border-bottom: 50px solid gray;
 border-left: 50px solid gray; */

 background: ${Theme.colors.black};
 border-radius: 40px;
`

const title = styled.li`
 
`