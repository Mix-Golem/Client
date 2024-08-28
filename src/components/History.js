import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

import Album from '../img/Album1.svg';

const History = ({ history, updateSelectedSong }) => {
  //   useEffect(() => {
  //     setHistory(history);
  //   }, [history]);

  const [selectedSong, setSelectedSong] = useState(null);
  const handleSongClick = (index) => {
    setSelectedSong(index);
    // updateSelectedSong(history[index].result);
    // api 호출함수 하나 만들고 updateSelectedSong()에 response 넣기
    // 전달하는 props는 곡 정보 전체
  };

  return (
    <HistoryWrapper>
      <HistoryTitle>History</HistoryTitle>
      <HistoryListWrapper>
        {history && (
          <>
            {history.map((item, index) => (
              <HistoryList
                key={index}
                isSelected={index === selectedSong}
                onClick={() => handleSongClick(index)}
              >
                {/* 예시 api는 이미지 없음 아래 이미지는 견본 */}
                {/* <img src={item.thumbnail} alt='Song' /> */}
                <img src={Album} alt='Song' />
                <HistoryInfo>
                  <p>{item.title}</p>
                  <p>{item.userName}</p>
                </HistoryInfo>
              </HistoryList>
            ))}
          </>
        )}
      </HistoryListWrapper>
    </HistoryWrapper>
  );
};

export default History;

const HistoryWrapper = styled.div`
  position: absolute;
  width: 415px;
  height: 796px;
  left: 855px;
  top: 23px;
  padding-right: 20px;
  box-sizing: border-box;
  border-radius: 20px;
  background: ${Theme.colors.black};
`;

const HistoryTitle = styled.p`
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

const HistoryListWrapper = styled.div`
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

const HistoryList = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 163px;
  background: ${(props) =>
    props.isSelected
      ? 'linear-gradient(270deg, #D9D9D9 28.08%, #81D8F3 100%)'
      : 'black'};
  border-style: none;
  position: relative;

  img {
    margin-left: 21px;
    width: 120px;
    height: 120px;
    border-radius: 20px;
    object-fit: fill;
    align-self: center;
  }
`;

const HistoryInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 18px;

  p {
    text-align: left;

    &:nth-child(1) {
      /* margin-top: 15px; */
      margin-bottom: 15px;
      ${Theme.fonts.songTitle}
      color: ${Theme.colors.white};
    }

    &:nth-child(2) {
      ${Theme.fonts.songArtist}
      color: ${Theme.colors.gray};
    }
  }
`;
