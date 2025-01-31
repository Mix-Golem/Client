import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

// 가사 text를 직접 전달
const Lyrics = ({ lyrics }) => {
  const [lyricsText, setLyricsText] = useState('');

  useEffect(() => {
    setLyricsText(lyrics);
  }, [lyrics]);

  return (
    <LyricsWrapper>
      <LyricsTitle>Lyrics</LyricsTitle>
      <LyricsContentsWrapper>
        <LyricsContents>{lyricsText}</LyricsContents>
      </LyricsContentsWrapper>
    </LyricsWrapper>
  );
};

export default Lyrics;

// 그라데이션 박스
const GradientBox = styled.div`
  background: linear-gradient(180deg, #666666 1.13%, #000000 25.35%);
  border-radius: 20px;
`;

const LyricsWrapper = styled(GradientBox)`
  position: absolute;
  width: 415px;
  height: 796px;
  left: 855px;
  top: 23px;
  padding-right: 20px;
  box-sizing: border-box;
`;

const LyricsTitle = styled.p`
  position: relative;
  display: flex;
  margin: 0px;
  width: auto;
  height: 84px;
  ${Theme.fonts.title}
  color: ${Theme.colors.white};

  justify-content: center;
  align-items: center;
  text-align: center;
`;

const LyricsContentsWrapper = styled.div`
  width: 100%;
  height: calc(100% - 84px);
  overflow-y: scroll;
  padding-left: 15px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const LyricsContents = styled.div`
  margin-bottom: 30px;
  padding: 0 40px; // 양쪽 공백
  box-sizing: border-box;
  ${Theme.fonts.lyrics}
  color: ${Theme.colors.white};
  white-space: pre-wrap;
`;
