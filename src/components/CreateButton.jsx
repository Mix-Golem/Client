import React, { useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme';

const CreateButton = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const maxCharacters = 200;

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setInputValue(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      setInputValue(''); // Clear the input after submission
    }
  };

  return (
    <PromptContainer>
      <PromptTitle>Prompt</PromptTitle>
      <InputArea
        placeholder='Please write down the music genre and music content you want.'
        value={inputValue}
        onChange={handleInputChange}
        maxLength={maxCharacters}
      />
      <CharacterCounter>
        {inputValue.length}/{maxCharacters}
      </CharacterCounter>
      <SubmitButton onClick={handleSubmit}>
        <p>Create</p>
        <p>-10 credits</p>
      </SubmitButton>
    </PromptContainer>
  );
};

export default CreateButton;

const PromptContainer = styled.div`
  position: absolute;
  padding: 0 20px;
  width: 320px;
  height: 258px;
  left: 0px;
  bottom: 0px;
  background: none;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PromptTitle = styled.h2`
  ${Theme.fonts.title};
  color: ${Theme.colors.white};
  margin-bottom: 20px;
`;

const InputArea = styled.textarea`
  width: 90%;
  height: 100px;
  background: ${Theme.colors.lightGray};
  border: none;
  border-radius: 10px;
  color: ${Theme.colors.white};
  padding: 10px;
  font-size: 15px;
  resize: none;
  outline: none;

  &::placeholder {
    color: ${Theme.colors.gray};
  }

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${Theme.colors.white};
  }
`;

const CharacterCounter = styled.div`
  width: 100%;
  text-align: right;
  font-size: 14px;
  color: ${Theme.colors.gray};
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Theme.colors.gray};
  border: none;
  border-radius: 20px;
  margin-top: -5px;
  padding-left: 40px;
  width: 222px;
  height: 38px;
  color: ${Theme.colors.white};
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background: ${Theme.colors.lightGray};
  }

  p {
    ${Theme.fonts.dropdownItem};

    &:nth-child(2) {
      margin-top: 5px;
      margin-left: 10px;
      font-size: 15px;
      font-weight: 100;
    }
  }
`;
