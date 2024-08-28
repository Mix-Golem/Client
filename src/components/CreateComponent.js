import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

import Album from '../img/Album1.svg';

const CreateComponent = (songInfo) => {
  const SongInfoDemo = {
    isSuccess: true,
    code: 200,
    message: 'success!',
    result: {
      id: 16,
      userId: 1,
      title: '제목',
      about: '곡 소개',
      prompt: '사용자가 입력한 프롬프트',
      media: 'base64기반 코드',
      public: 0,
      thumbnail: 'base64기반 코드',
      lyrics: [
        {
          startTime: '00:00:00',
          endTime: '00:00:10',
          content: '가사 내용',
        },
        {
          startTime: '00:00:11',
          endTime: '00:00:12',
          content: '가사 내용',
        },
      ],
      like: {
        song_id: 16,
        song_count: 3,
      },
    },
  };

  return (
    <ComponentContainer>
      <AlbumContainer onClick={() => {}}>
        {/* <img src={SongInfoDemo.result.thumbnail} alt='Song' /> */}
        <img src={Album} alt='Song' />
        <AlbumInfo>
          <p>{SongInfoDemo.result.title}</p>
          {/* <p>{SongInfoDemo.result.userName}</p> */}
          <p>박스깎는 노인</p>
          <PublicBtn>Public</PublicBtn>
        </AlbumInfo>
      </AlbumContainer>
      <hr />
      <ContentContainer>
        <LeftColumn>
          <SectionTitle>lyrics</SectionTitle>
          <LyricsText>{SongInfoDemo.result.lyrics[0].content}</LyricsText>
        </LeftColumn>
        <MidLine />
        <RightColumn>
          <SectionTitle>Prompt</SectionTitle>
          {/* <SectionText>{SongInfoDemo.result.prompt}</SectionText> */}
          <SectionText>
            다이아 랭크로 올라가고 싶은 서원우의 갈망을 발라드로 보여줬으면
            좋겠어, 서원우는 현재 에메랄드 랭크로 다이아 바로 밑 랭크야 그는
            다이아 랭크를 못 간지 몇년이 넘었어 다이아 랭크로 올라가고 싶은
            서원우의 갈망을 발라드로 보여줬으면 좋겠어, 서원우는 현재 에메랄드
            랭크로 다이아 바로 밑 랭크야 그는 다이아 랭크를 못 간지 몇년이
            넘었어
          </SectionText>
          <SectionTitle>About</SectionTitle>
          {/* <SectionText>{SongInfoDemo.result.about}</SectionText> */}
          <SectionText>
            다이아를 향한 갈망은 한 인간의 꿈과 열정을 노래한 곡입니다. 이 곡은
            삶의 도전과 역경을 극복하고 더 높은 목표를 향해 나아가 는 의지를
            담고 있습니다. 다이아를 향한 갈망은 한 인간의 꿈과 열정을 노래한
            곡입니다. 이 곡은 삶의 도전과 역경을 극복하고 더 높은 목표를 향해
            나아가 는 의지를 담고 있습니다.
          </SectionText>
        </RightColumn>
      </ContentContainer>
    </ComponentContainer>
  );
};

export default CreateComponent;

const ComponentContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 41px;
  top: 23px;
  width: 744px;
  height: 663px;
  overflow: hidden;
  background: #000000;
  border-radius: 20px;

  hr {
    width: 85%;
  }
`;

const AlbumContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  background: ${Theme.colors.black};
  border-style: none;
  padding: 10px;
  gap: 10px;

  img {
    margin-left: 52px;
    width: 160px;
    height: 160px;
    border-radius: 20px;
    object-fit: fill;
  }
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin-left: 18px;

  ${Theme.fonts.title};
  font-weight: 800;

  p {
    text-align: left;

    &:nth-child(1) {
      margin-top: 15px;
      margin-bottom: 15px;

      font-size: 42px;
      color: ${Theme.colors.white};
    }

    &:nth-child(2) {
      font-size: 24px;
      color: ${Theme.colors.gray};
      letter-spacing: -0.1em;
    }
  }
`;

const PublicBtn = styled.button`
  display: flex;
  margin-top: 20px;
  width: 87px;
  height: 25px;
  background: ${Theme.colors.gray};
  border-radius: 20px;
  justify-content: center;
  align-items: center;

  ${Theme.fonts.playlistTitle};
  color: ${Theme.colors.white};
  font-size: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  width: 85%;
  height: 100%;
  justify-content: space-between;

  white-space: pre-wrap;
  gap: 30px;

  ${Theme.fonts.title};
`;

const LeftColumn = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  gap: 20px;
`;

const LyricsText = styled.div`
  height: 380px;
  ${Theme.fonts.songArtist};
  color: ${Theme.colors.white};
  line-height: 24px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const MidLine = styled.div`
  border-left: 1px solid ${Theme.colors.gray};
  height: 100%;
`;

const RightColumn = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  height: 440px;
  gap: 20px;
  overflow-y: hidden;
`;

const SectionTitle = styled.h2`
  color: ${Theme.colors.white};
  text-align: center;
`;

const SectionText = styled.div`
  height: 140px;
  ${Theme.fonts.songArtist};
  color: ${Theme.colors.white};
  line-height: 25px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;
