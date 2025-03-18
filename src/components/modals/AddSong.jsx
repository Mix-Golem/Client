import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';

import GetPlaylistByID from '../../api/music/GetPlaylistByID';
import Plus from '../../img/Plus.svg';

const AddSong = ({ datalist, onClose, onAddSong, isForSong, srcID, token }) => {
  let currentSrcID;
  let currentDatalist = datalist;
  useEffect(() => {
    currentSrcID = srcID;
    currentDatalist = datalist;
  }, [srcID, datalist]);

  // isForSong == true면 MySong -> playlist로 호출(modal에 추가할 playlist 표시)
  // isForSong == false면 playlist -> MySong으로 호출(modal에 추가될 MySong 표시)
  const HandleAddSong = (destID) => {
    console.log('isForSong: ' + isForSong);
    console.log('srcID: ' + currentSrcID);
    console.log('destID: ' + destID);
    // console.log(currentDatalist);
    if (isForSong) {
      // MySong에서 playlist로 추가하기
      GetPlaylistByID(destID, token).then((response) => {
        if (response.isSuccess) {
          const playlistSongs = response.result.songs;

          // 곡이 없다면 바로 추가
          if (!playlistSongs) {
            onAddSong(destID, srcID);
            console.log('add successfully');
            return;
          }

          // 중복 여부 확인
          const isSongAlreadyInPlaylist = playlistSongs.some(
            (song) => song.song_id === srcID
          );

          if (isSongAlreadyInPlaylist) {
            console.log('이미 플레이리스트에 존재하는 곡입니다.');
            return;
          }

          onAddSong(destID, srcID);
          console.log('성공적으로 저장되었습니다.');
        }
      });
    } else {
      // playlist에서 MySong을 추가하기
      GetPlaylistByID(srcID, token).then((response) => {
        if (response.isSuccess) {
          const playlistSongs = response.result.songs;

          // 곡이 없는 경우 바로 추가
          if (!playlistSongs) {
            onAddSong(srcID, destID);
            console.log('성공적으로 저장되었습니다.');
            return;
          }

          // 중복 여부 확인
          const isSongAlreadyInPlaylist = playlistSongs.some(
            (song) => song.song_id === destID
          );

          if (isSongAlreadyInPlaylist) {
            console.log('이미 플레이리스트에 존재하는 곡입니다.');
            return;
          }

          onAddSong(srcID, destID);
          console.log('성공적으로 저장되었습니다.y');
        }
      });
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          {isForSong ? <p>My Playlists</p> : <p>My Songs</p>}
          <CloseButton onClick={onClose}>
            <img src={Plus} alt='X' />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {isForSong ? (
            <>
              {currentDatalist.map((item, index) => (
                <SongItem key={index}>
                  <img src={item.thumbnail} alt='Song' />
                  <SongInfo>
                    <p>{item.playlist_title}</p>
                  </SongInfo>
                  <AddButton onClick={() => HandleAddSong(item.playlist_id)}>
                    <img src={Plus} alt='+' />
                  </AddButton>
                </SongItem>
              ))}
            </>
          ) : (
            <>
              {currentDatalist.map((item, index) => (
                <SongItem key={index}>
                  <img src={item.thumbnail} alt='Song' />
                  <SongInfo>
                    <p>{item.title}</p>
                    <p>{item.artist}</p>
                  </SongInfo>
                  <AddButton onClick={() => HandleAddSong(item.id)}>
                    <img src={Plus} alt='+' />
                  </AddButton>
                </SongItem>
              ))}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddSong;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${Theme.colors.darkGray};
  border-radius: 30px;
  width: 874px;
  height: 621px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */

  p {
    margin: 0;
    color: ${Theme.colors.white};
    ${Theme.fonts.title};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 50px;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
    transform: rotate(45deg);
  }
`;

const ModalBody = styled.div`
  margin-top: 20px;
  padding-left: 25px;
  padding-right: 50px;
  border-radius: 25px;
  overflow-y: scroll;
  width: 801px;
  height: 519px;
  background-color: ${Theme.colors.black};

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const SongItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 40px;
  position: relative;

  img {
    width: 120px;
    height: 120px;
    border-radius: 20px;
  }

  &:not(:last-child) {
    &:not(:last-child)::after {
      content: '';
      margin-bottom: 0px;
      position: absolute;
      bottom: -20px; /* Position the line 10px below the item */
      left: 3%; /* Start the line 10% from the left edge */
      right: 3%; /* End the line 10% from the right edge */
      border-bottom: 1px solid ${Theme.colors.gray};
    }
  }
`;

const SongInfo = styled.div`
  flex-grow: 1;
  margin-left: 10px;

  p {
    text-align: left;

    &:nth-child(1) {
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

const AddButton = styled.button`
  background: none;
  border: none;
  color: ${Theme.colors.white};
  font-size: 50px;
  cursor: pointer;

  img {
    width: 50px;
    height: 50px;
  }
`;
