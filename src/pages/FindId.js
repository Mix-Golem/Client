import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BigButton from '../components/LoginJoin/BigButton.js';
import InputField from '../components/LoginJoin/InputField.js';
import Label from '../components/LoginJoin/Label.js';
import SmallButton from '../components/LoginJoin/SmallButton.js';
import LoginBackgroundImg from '../img/LoginBackgroundColor.svg';
import GlobalStyle from '../styles/GlobalStyle.js';
import { Theme } from '../styles/Theme.js';

const FindId = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();

  const handleEmailVerification = () => {
    alert('Verification code sent to your email.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your ID is: example_id');
    navigate('/login');
  };

  return (
    <>
      <GlobalStyle />
      <FindIdContainer>
        <FindIdForm onSubmit={handleSubmit}>
          <Title>아이디 찾기</Title>
          <FormGroup>
            <Label htmlFor='email'>닉네임</Label>
            <InputRow>
              <InputField
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <SmallButton type='button' onClick={handleEmailVerification}>
                인증
              </SmallButton>
            </InputRow>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='verificationCode'>생년월일</Label>
            <InputField
              type='text'
              id='verificationCode'
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </FormGroup>
          <BigButton type='submit'>아이디 찾기</BigButton>
        </FindIdForm>
      </FindIdContainer>
    </>
  );
};

export default FindId;

const FindIdContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${LoginBackgroundImg}) no-repeat center center/cover;
`;

const FindIdForm = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  z-index: 1;
  max-width: 400px;
  width: 100vw;
`;

const Title = styled.h2`
  ${Theme.fonts.button}
  color: ${Theme.colors.white};
  margin-bottom: 50px;
  text-align: center;
`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
`;
