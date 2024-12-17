import { React, useState,useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Theme } from '../styles/Theme'

import {ReactWaveform} from 'react-audio-wave-modern';

function Wave({music, musicTitle, artist, isPlay}) {

    const audioUrl = {music};
    const options = {
      "container": "#waveform",
      "height": "30px",
      "width" :"100px", 
      "waveColor": "gray",
      "progressColor": "#32D583",
      "cursorWidth": 0,
      "barWidth": "3px",
      "barGap": 2,
      "barRadius": 3,
      "barHeight": 1,
      "mediaControls": false,
      "dragToSeek": true      
    };

  return (
    <FieldWrapper>
        <WaveContent>
        {/* <ReactWaveform audioUrl={audioUrl} options={options} /> */}
        </WaveContent>
        <MusicContent>
            <MusicTitle>{musicTitle}</MusicTitle>
            <MusicArtist>{artist}</MusicArtist>
        </MusicContent>
    </FieldWrapper>
  )
}

export default Wave

const FieldWrapper = styled.div`
    position: absolute;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 424px;
    height: 81px;
    left: 280px;
    top: 82px;
    border-radius: 20px;
    background-color: ${Theme.colors.black};
`

const WaveContent = styled.div`
    /* background-color: ${Theme.colors.white}; */
    display: flex;
    justify-content: center;
    width: 114px;
    height: 70px;
    margin-right: 40px;
    margin-left: 48px;
`
const MusicContent = styled.div`
    position: relative;
    width: 190px;
    height: 60px;
    /* justify-content: center; */
    align-items: center;
    /* display: flex; */
`
const MusicTitle = styled.div`
    ${Theme.fonts.songTitle}
    font-size: 30px;
    color: ${Theme.colors.white};
`
const MusicArtist = styled.div`
    ${Theme.fonts.songArtist}
    margin-top: 5px;
    font-size: 23px;
    color: ${Theme.colors.lightGray};

`