import React, { useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme.js';

const RenameMySong = ({ onClose, onRename, songData }) => {
  const [newName, setNewName] = useState('');

  const handleRename = () => {
    if (newName.trim()) {
      onRename(songData, newName);
      onClose();
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Rename</Title>
        <CurrentName>Current Name: {songData.title}</CurrentName>
        <InputField
          type='text'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder='Enter new name'
        />
        <ButtonContainer>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton
            onClick={() => {
              handleRename();
            }}
          >
            Confirm
          </ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RenameMySong;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${Theme.colors.darkGray};
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  color: ${Theme.colors.white};
`;

const Title = styled.h2`
  ${Theme.fonts.title};
  margin-bottom: 20px;
`;

const CurrentName = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid ${Theme.colors.gray};
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 16px;
  background-color: ${Theme.colors.lightGray};
  color: ${Theme.colors.white};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  background: ${Theme.colors.gray};
  color: ${Theme.colors.white};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${Theme.colors.lightGray};
  }
`;

const ConfirmButton = styled.button`
  background: ${Theme.colors.lightBlue};
  color: ${Theme.colors.white};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: ${Theme.colors.darkBlue};
  }
`;
