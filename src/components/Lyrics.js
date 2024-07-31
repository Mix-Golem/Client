import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Theme } from "../styles/Theme";

// 가사 text를 직접 전달
const Lyrics = ({ lyrics }) => {
  const [lyricsText, setLyricsText] = useState("");

  useEffect(() => {
    setLyricsText(lyrics);
  }, [lyrics]);

  return (
    <LyricsWrapper>
      <LyricsTitle>Lyrics</LyricsTitle>
      <LyricsContents>{lyricsText}</LyricsContents>
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

// 예시처럼 만드려면 커스텀 해야할지도..?
const LyricsContents = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 301px;
  height: 674px;
  justify-content: center;
  overflow-y: scroll;

  ${Theme.fonts.lyrics}
  color: ${Theme.colors.white};
  white-space: pre-wrap;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;
