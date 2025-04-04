import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { helix } from 'ldrs';

import { useNavigate } from 'react-router-dom';
import { Theme } from '../styles/Theme';
import Cookies from 'js-cookie';

import GetMySongByID from '../api/music/GetMySongByID';
import TogglePublic from '../api/music/TogglePublic';

const CreateComponent = ({ history, selectedSong, isLoading }) => {
  const [selectedSongInfo, setSelectedSongInfo] = useState({
    id: '',
    userId: '',
    userName: '',
    title: '',
    about: '',
    prompt: '',
    media: '',
    public: false, // true or false
    thumbnail: '',
    lyrics: [
      {
        startTime: '',
        endTime: '',
        content: '',
      },
    ],
    artist: '',
  });

  const [isPublic, setIsPublic] = useState(selectedSongInfo.public);
  const navigate = useNavigate();
  const token = Cookies.get('token');
  helix.register();

  // let loadingState = false;
  const [loadingState, setLoadingState] = useState(false);
  useEffect(() => {
    setLoadingState(isLoading);
  }, [isLoading]);

  const handleTogglePublic = () => {
    setIsPublic((prevState) => !prevState);
    setSelectedSongInfo((prevInfo) => ({
      ...prevInfo,
      public: !prevInfo.public,
    }));
    TogglePublic(selectedSongInfo, token);
  };

  const updateSongInfo = (selectedSong) => {
    if (selectedSong !== null) {
      GetMySongByID(history[selectedSong].id, token).then((response) => {
        if (response.isSuccess) {
          response.result.lyrics[0].content =
            response.result.lyrics[0].content.replace(/\[/g, (offset) => {
              return offset === 0 ? '[' : '\n[';
            });

          setSelectedSongInfo(response.result);
        }
      });
    }
  };

  const handleSongDoubleClick = (songId) => {
    const songIds = [songId];

    // 이동과 함께 상태 전달
    navigate('/', { state: { track: songIds, musicNumber: songId } });
  };

  useEffect(() => {
    setIsPublic(selectedSongInfo.public);
  }, [selectedSongInfo.public]);

  useEffect(() => {
    updateSongInfo(selectedSong);
  }, [selectedSong]);

  return (
    <ComponentContainer>
      <AlbumContainer>
        {!selectedSongInfo?.id ? (
          // CASE 1: No song & Loading
          loadingState ? (
            <AlbumBlankFrame>
              <l-helix size='70' speed='1.5' color='black'></l-helix>
            </AlbumBlankFrame>
          ) : (
            // CASE 2: No song & No loading
            <AlbumBlankFrame />
          )
        ) : (
          // CASE 3 & 4: Song
          <>
            {loadingState ? (
              // CASE 3: Song & Loading
              <AlbumFrame>
                <AlbumImgFrame>
                  <img
                    onDoubleClick={() => {
                      handleSongDoubleClick(selectedSongInfo.id);
                    }}
                    src={selectedSongInfo.thumbnail}
                    alt='Song'
                  ></img>
                  <AlbumLoadingBox>
                    <l-helix size='30' speed='1.5' color='black'></l-helix>
                  </AlbumLoadingBox>
                </AlbumImgFrame>
                <AlbumInfo>
                  <p title={selectedSongInfo.title}>{selectedSongInfo.title}</p>
                  <p title={selectedSongInfo.artist}>
                    {selectedSongInfo.artist}
                  </p>
                  <PublicBtn $isPublic={isPublic} onClick={handleTogglePublic}>
                    {isPublic ? 'Private' : 'Public'}
                  </PublicBtn>
                </AlbumInfo>
              </AlbumFrame>
            ) : (
              // CASE 4: Song & No loading
              <AlbumFrame>
                <AlbumImgFrame>
                  <img
                    onDoubleClick={() => {
                      handleSongDoubleClick(selectedSongInfo.id);
                    }}
                    src={selectedSongInfo.thumbnail}
                    alt='Song'
                  />
                </AlbumImgFrame>
                <AlbumInfo>
                  <p title={selectedSongInfo.title}>{selectedSongInfo.title}</p>
                  <p title={selectedSongInfo.artist}>
                    {selectedSongInfo.artist}
                  </p>
                  <PublicBtn $isPublic={isPublic} onClick={handleTogglePublic}>
                    {isPublic ? 'Private' : 'Public'}
                    {/* Display Public or Private */}
                  </PublicBtn>
                </AlbumInfo>
              </AlbumFrame>
            )}
          </>
        )}
      </AlbumContainer>
      <hr />
      <ContentContainer>
        <LeftColumn>
          <SectionTitle>lyrics</SectionTitle>
          <LyricsText>{selectedSongInfo.lyrics[0].content}</LyricsText>
        </LeftColumn>
        <MidLine />
        <RightColumn>
          <SectionTitle>Prompt</SectionTitle>
          <SectionText>{selectedSongInfo.prompt}</SectionText>
          {/* <SectionTitle>About</SectionTitle>
          <SectionText>{selectedSongInfo.about}</SectionText> */}
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
  flex-direction: row;
  width: 100%;
  height: 200px;
  background: ${Theme.colors.black};
  border-style: none;
  padding: 10px;
  gap: 10px;
`;

const AlbumFrame = styled.div`
  position: relative;
  display: flex;
  margin-left: 52px;
  /* width: 160px; */
  height: 160px;
  border-radius: 20px;
  /* background-color: white; */
`;

const AlbumImgFrame = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 20px;

  img {
    background-color: white;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    cursor: pointer;
  }
`;

const AlbumBlankFrame = styled.div`
  margin-left: 52px;
  background-color: white;
  width: 160px;
  height: 160px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: fill;
`;

const AlbumLoadingBox = styled.div`
  position: absolute;
  top: 10px;
  right: 8px;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 살짝 그림자 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 18px;

  ${Theme.fonts.title};
  font-weight: 800;
  width: 480px;

  p {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 480px;

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
  background: ${({ $isPublic }) =>
    $isPublic ? Theme.colors.red : Theme.colors.gray};
  border: none;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

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
  ${Theme.fonts.title};
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
