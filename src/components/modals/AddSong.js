import React, { useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme';
import Plus from '../../img/Plus.svg';

const onAddSong = (index) => {};

const AddSong = ({ songlist, onClose, onAddSong }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <p>My Songs</p>
          <CloseButton onClick={onClose}>
            <img src={Plus} alt='X' />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {songlist.map((item, index) => (
            <SongItem key={index}>
              <img src={item.thumbnail} alt='Song' />
              <SongInfo>
                <p>{item.title}</p>
                <p>{item.artist}</p>
              </SongInfo>
              <AddButton onClick={() => onAddSong(index)}>
                <img src={Plus} alt='+' />
              </AddButton>
            </SongItem>
          ))}
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
  background: rgba(0, 0, 0, 0.5);
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
