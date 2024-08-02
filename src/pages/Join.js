import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import BigButton from '../components/LoginJoin/BigButton.js';
import Footer, { FooterLink } from '../components/LoginJoin/Footer.js';
import InputField from '../components/LoginJoin/InputField.js';
import SmallButton from '../components/LoginJoin/SmallButton.js';
import { schemaSignup } from '../hooks/ValidationYup.js';
import LoginBackgroundImg from '../img/LoginBackgroundColor.svg';
import Logo from '../img/Logo.svg';
import GlobalStyle from '../styles/GlobalStyle.js';
import { Theme } from '../styles/Theme.js';

const Join = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
  });

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
    navigate('/login');
  };

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <JoinContainer>
          <StyledLogo src={Logo} alt='Logo' />
          <JoinForm onSubmit={handleSubmit(onSubmit)}>
            <Title>회원가입</Title>
            <FieldWrapper>
              <Controller
                name='nickname'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='닉네임'
                    placeholder='닉네임을 입력하세요'
                    {...field}
                    error={errors.nickname?.message}
                  />
                )}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='전화번호'
                    placeholder='전화번호를 입력하세요'
                    {...field}
                    error={errors.phone?.message}
                  />
                )}
              />
            </FieldWrapper>
            <FieldWrapper>
              <BirthDateWrapper>
                <InputLabel>생년월일</InputLabel>
                <Controller
                  name='birthDate.year'
                  control={control}
                  render={({ field }) => (
                    <StyledInput
                      placeholder='YYYY'
                      {...field}
                      error={errors.birthDate?.year?.message}
                    />
                  )}
                />
                <Controller
                  name='birthDate.month'
                  control={control}
                  render={({ field }) => (
                    <StyledInput
                      placeholder='MM'
                      {...field}
                      error={errors.birthDate?.month?.message}
                    />
                  )}
                />
                <Controller
                  name='birthDate.day'
                  control={control}
                  render={({ field }) => (
                    <StyledInput
                      placeholder='DD'
                      {...field}
                      error={errors.birthDate?.day?.message}
                    />
                  )}
                />
              </BirthDateWrapper>
            </FieldWrapper>
            <FieldWrapper>
              <GenderWrapper>
                <InputLabel>성별</InputLabel>
                <Controller
                  name='gender'
                  control={control}
                  render={({ field }) => (
                    <GenderContainer>
                      <GenderBox
                        id='male'
                        name='gender'
                        isSelected={field.value === 'male'}
                        onClick={() => field.onChange('male')}
                      >
                        남성
                      </GenderBox>
                      <GenderBox
                        id='female'
                        name='gender'
                        isSelected={field.value === 'female'}
                        onClick={() => field.onChange('female')}
                      >
                        여성
                      </GenderBox>
                    </GenderContainer>
                  )}
                />
              </GenderWrapper>
            </FieldWrapper>
            <FieldWithButtonWrapper>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='이메일'
                    placeholder='이메일을 입력하세요'
                    {...field}
                    error={errors.email?.message}
                  />
                )}
              />
              <SmallButton>인증</SmallButton>
            </FieldWithButtonWrapper>
            <FieldWithButtonWrapper>
              <Controller
                name='emailNumber'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='이메일 인증번호'
                    placeholder='이메일 인증번호를 입력하세요'
                    {...field}
                    error={errors.emailNumber?.message}
                  />
                )}
              />
              <SmallButton>확인</SmallButton>
            </FieldWithButtonWrapper>
            <FieldWrapper>
              <Controller
                name='pw'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='비밀번호'
                    placeholder='비밀번호를 입력하세요'
                    type='password'
                    {...field}
                    error={errors.pw?.message}
                  />
                )}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Controller
                name='checkPw'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='비밀번호 확인'
                    placeholder='비밀번호를 한번 더 입력하세요'
                    type='password'
                    {...field}
                    error={errors.checkPw?.message}
                  />
                )}
              />
            </FieldWrapper>
            <StyledBigButton type='submit'>회원가입</StyledBigButton>
            <Footer>
              <div>
                이미 계정이 있으신가요?{' '}
                <FooterLink href='/login'>로그인</FooterLink>
              </div>
            </Footer>
          </JoinForm>
        </JoinContainer>
      </ThemeProvider>
    </>
  );
};

export default Join;

const Title = styled.h2`
  ${Theme.fonts.button}
  color: ${Theme.colors.white};
  text-align: center;
  margin-bottom: 40px;
`;

const StyledLogo = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${LoginBackgroundImg}) no-repeat center center/cover;
`;

const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.7);
  color: ${Theme.colors.white};
  max-width: 500px;
  width: 100%;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const FieldWithButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  button {
    margin-left: 10px;
    height: 41px;
  }
`;

const BirthDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  input {
    flex: 1;
    background: ${Theme.colors.white};
    border: 1px solid ${Theme.colors.borderGray};
    border-radius: 20px;
    padding: 0 20px;
    height: 41px;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const GenderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 370px;
`;

const GenderBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 41px;
  border-radius: 20px;
  background-color: ${({ isSelected }) =>
    isSelected ? Theme.colors.lightBlue : Theme.colors.white};
  color: ${({ isSelected }) =>
    isSelected ? Theme.colors.black : Theme.colors.black};
  border: ${({ isSelected }) =>
    isSelected
      ? '2px solid' + Theme.colors.darkBlue
      : '2px solid' + Theme.colors.borderGray};
  cursor: pointer;
  ${Theme.fonts.label}
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;

const InputLabel = styled.label`
  ${Theme.fonts.label}
  color: ${Theme.colors.white};
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  margin-right: 10px;
  ${Theme.fonts.label}
  text-align: center;
  color: ${Theme.colors.white};
`;

const StyledBigButton = styled(BigButton)`
  width: 100%;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  flex: 1;
  background: ${Theme.colors.white};
  border: 1px solid ${Theme.colors.borderGray};
  border-radius: 20px;
  padding: 0 20px;
  height: 41px;
  width: 100%;
`;
