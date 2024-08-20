import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import BigButton from '../components/LoginJoin/BigButton.js';
import Footer, { FooterLink } from '../components/LoginJoin/Footer.js';
import InputField from '../components/LoginJoin/InputField.js';
import { schemaLogin } from '../hooks/ValidationYup';
import GoogleLogo from '../img/GoogleLogo.svg';
import KakaoLogo from '../img/KakaoLogo.svg';
import LoginBackgroundImg from '../img/LoginBackgroundColor.svg';
import Logo from '../img/Logo.svg';
import GlobalStyle from '../styles/GlobalStyle';
import { Theme } from '../styles/Theme.js';
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      // Your login API call here
      console.log('Submitted:', data);
      navigate('/');
    } catch (error) {
      console.error(error);
      setModalMessage('로그인에 실패했습니다.');
      setIsModalOpen(true);
    }
  };

  const handleSignupClick = () => {
    navigate('/auth/signup');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    handleModalClose();
  };

  // const handleKakaoLogin = () => {
  //   if (!window.Kakao || !window.Kakao.Auth) {
  //     console.error('Kakao SDK가 초기화되지 않았습니다.');
  //     setModalMessage(
  //       '카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.'
  //     );
  //     setIsModalOpen(true);
  //     return;
  //   }

  //   window.Kakao.Auth.login({
  //     success: function (authObj) {
  //       console.log('Kakao 로그인 성공:', authObj);
  //       navigate('/');
  //     },
  //     fail: function (err) {
  //       console.error('Kakao 로그인 실패:', err);
  //       setModalMessage(
  //         '카카오 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.'
  //       );
  //       setIsModalOpen(true);
  //     },
  //   });
  // };

  // const googleLogin = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     console.log('Google 로그인 성공:', tokenResponse);
  //     navigate('/');
  //   },
  //   onError: () => {
  //     console.error('Google 로그인 실패');
  //     setModalMessage('구글 로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
  //     setIsModalOpen(true);
  //   },
  // });

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <LoginContainer>
        <StyledLogo src={Logo} alt='Logo' />
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Title>로그인</Title>
          <FormGroup>
            <FieldWrapper>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='이메일'
                    placeholder='이메일을 입력하세요'
                    error={errors.email?.message}
                    {...field}
                  />
                )}
              />
            </FieldWrapper>
            <FieldWrapper>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <InputField
                    label='비밀번호'
                    placeholder='비밀번호를 입력하세요'
                    type='password'
                    autoComplete='current-password'
                    error={errors.password?.message}
                    {...field}
                  />
                )}
              />
            </FieldWrapper>
            <StyledBigButton type='submit'>로그인</StyledBigButton>
            <BlankContainer>OR</BlankContainer>
            <SocialLoginButton
              $bgColor={Theme.colors.white}
              $color={Theme.colors.black}
              // onClick={() => googleLogin()}
            >
              <img src={GoogleLogo} alt='Google Logo' />
              Sign With Google
            </SocialLoginButton>
            <SocialLoginButton
              $bgColor='#FEE500'
              color={Theme.colors.black}
              // onClick={handleKakaoLogin}
            >
              <img src={KakaoLogo} alt='Kakao Logo' />
              Sign With Kakao
            </SocialLoginButton>
            <Footer>
              <div>
                이메일을 잊어버렸나요?
                <FooterLink href='/findid'>이메일 찾기</FooterLink>
              </div>
              <div>
                비밀번호를 잊어버렸나요?
                <FooterLink href='/findpassword'>비밀번호 찾기</FooterLink>
              </div>
              <div>
                계정이 없으신가요?{' '}
                <FooterLink href='/signup'>회원가입</FooterLink>
              </div>
              <div>
                일단 앱을 둘러보실래요?{' '}
                <FooterLink href='/library'>로그인 없이 둘러보기</FooterLink>
              </div>
            </Footer>
          </FormGroup>
        </LoginForm>
      </LoginContainer>
    </ThemeProvider>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url(${LoginBackgroundImg}) no-repeat center center/cover;
`;

const StyledLogo = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 40px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  z-index: 1;
  width: 387px;
`;

const Title = styled.h2`
  ${Theme.fonts.button}
  color: ${Theme.colors.white};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  width: 100%;
  position: relative;
`;

const BlankContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 2;
  margin: 20px 20px;
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px solid #cdcdcd;
    margin: 0 10px;
  }

  color: ${Theme.colors.white};
  ${Theme.fonts.subTitle}
`;

const SocialLoginButton = styled.button`
  position: relative;
  margin: 10px 0;
  border: none;
  ${Theme.fonts.button}
  width: 100%;
  height: 48.26px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 69px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$color};

  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
`;

const StyledBigButton = styled(BigButton)`
  width: 100%;
`;
