import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BigButton from '../components/LoginJoin/BigButton.jsx';
import InputField from '../components/LoginJoin/InputField.jsx';
import SmallButton from '../components/LoginJoin/SmallButton.jsx';
import LoginBackgroundImg from '../img/LoginBackgroundColor.svg';
import GlobalStyle from '../styles/GlobalStyle.js';
import { Theme } from '../styles/Theme.js';

const FindPassword = () => {
  const [email, setnickname] = useState('');
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
          <Title>비밀번호 찾기</Title>
          <FormGroup>
            <InputField
              id='nickname'
              label='닉네임'
              type='nickname'
              value={email}
              onChange={(e) => setnickname(e.target.value)}
              placeholder='닉네임을 입력하세요'
            />
            <SmallButton type='button' onClick={handleEmailVerification}>
              인증
            </SmallButton>
          </FormGroup>
          <FormGroup>
            <InputField
              id='email'
              label='이메일'
              type='email'
              value={email}
              onChange={(e) => setnickname(e.target.value)}
              placeholder='이메일을 입력하세요'
            />
            <SmallButton type='button' onClick={handleEmailVerification}>
              인증
            </SmallButton>
          </FormGroup>
          <BigButton type='submit'>비밀번호 찾기</BigButton>
        </FindIdForm>
      </FindIdContainer>
    </>
  );
};

export default FindPassword;

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
  justify-content: space-between;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
`;
