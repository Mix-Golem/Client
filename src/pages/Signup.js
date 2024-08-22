import React, { useState } from 'react';
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
import { sendEmailVerificationCode } from '../api/user/signup/EmailGetCode.js';
import { yupResolver } from '@hookform/resolvers/yup';

const Signup = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleEmailVerification = async (email) => {
    try {
      const result = await sendEmailVerificationCode(email);
      if (result.isSuccess) {
        setModalMessage('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
        setEmailVerificationCode(result.result);
        setIsModalOpen(true);
      } else {
        setModalMessage(result.message || '이메일 인증에 실패했습니다.');
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage('이메일 인증에 실패했습니다.');
      setIsModalOpen(true);
    }
  };

  const handleEmailVerificationConfirm = (inputCode) => {
    if (inputCode === emailVerificationCode) {
      setEmailVerified(true);
      setModalMessage('이메일 인증이 완료되었습니다.');
    } else {
      setModalMessage('인증번호가 일치하지 않습니다.');
    }
    setIsModalOpen(true);
  };

  const onSubmit = async (data) => {
    if (!emailVerified) {
      setModalMessage('이메일 인증을 완료해주세요.');
      setIsModalOpen(true);
      return;
    }

    try {
      console.log('Submitted:', data);
      navigate('/');
    } catch (error) {
      console.error(error);
      setModalMessage('회원가입에 실패했습니다.');
      setIsModalOpen(true);
    }
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
                    id='nickname'
                    label='닉네임'
                    placeholder='닉네임을 입력하세요'
                    value={field.value}
                    onChange={field.onChange}
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
                    id='phone'
                    label='전화번호'
                    placeholder='전화번호를 입력하세요'
                    value={field.value}
                    onChange={field.onChange}
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
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name='birthDate.month'
                  control={control}
                  render={({ field }) => (
                    <StyledInput
                      placeholder='MM'
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  name='birthDate.day'
                  control={control}
                  render={({ field }) => (
                    <StyledInput
                      placeholder='DD'
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </BirthDateWrapper>
              {(errors.birthDate?.year ||
                errors.birthDate?.month ||
                errors.birthDate?.day) && (
                <ErrorMessage>
                  {errors.birthDate?.year?.message ||
                    errors.birthDate?.month?.message ||
                    errors.birthDate?.day?.message}
                </ErrorMessage>
              )}
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
              {errors.gender && (
                <ErrorMessage>{errors.gender.message}</ErrorMessage>
              )}
            </FieldWrapper>
            <FieldWithButtonWrapper>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <InputField
                    id='email'
                    label='이메일'
                    placeholder='이메일을 입력하세요'
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e);
                      setEmailVerified(false);
                    }}
                    error={errors.email?.message}
                  />
                )}
              />
              <SmallButton
                type='button'
                onClick={() => handleEmailVerification(getValues('email'))}
              >
                인증
              </SmallButton>
            </FieldWithButtonWrapper>
            <FieldWithButtonWrapper>
              <Controller
                name='emailNumber'
                control={control}
                render={({ field }) => (
                  <InputField
                    id='emailNumber'
                    label='이메일 인증번호'
                    placeholder='이메일 인증번호를 입력하세요'
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.emailNumber?.message}
                  />
                )}
              />
              <SmallButton
                type='button'
                onClick={() =>
                  handleEmailVerificationConfirm(getValues('emailNumber'))
                }
              >
                확인
              </SmallButton>
            </FieldWithButtonWrapper>
            <FieldWrapper>
              <Controller
                name='pw'
                control={control}
                render={({ field }) => (
                  <InputField
                    id='pw'
                    label='비밀번호'
                    placeholder='비밀번호를 입력하세요'
                    type='password'
                    value={field.value}
                    onChange={field.onChange}
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
                    id='checkPw'
                    label='비밀번호 확인'
                    placeholder='비밀번호를 한번 더 입력하세요'
                    type='password'
                    value={field.value}
                    onChange={field.onChange}
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

export default Signup;

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
      ? '2px solid ' + Theme.colors.darkBlue
      : '2px solid ' + Theme.colors.borderGray};
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

const ErrorMessage = styled.div`
  color: ${Theme.colors.red};
  margin-top: 5px;
  font-size: 12px;
  text-align: left;
  width: 100%;
`;
