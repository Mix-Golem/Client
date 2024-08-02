import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BigButton from '../components/LoginJoin/BigButton.js';
import Footer, { FooterLink } from '../components/LoginJoin/Footer.js';
import InputField from '../components/LoginJoin/InputField.js';
import Label from '../components/LoginJoin/Label.js';
import GoogleLogo from '../img/GoogleLogo.svg';
import KakaoLogo from '../img/KakaoLogo.svg';
import LoginBackgroundImg from '../img/LoginBackgroundColor.svg';
import Logo from '../img/Logo.svg';
import GlobalStyle from '../styles/GlobalStyle.js';
import { Theme } from '../styles/Theme.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', { email, password });
        navigate('/');
    };

    return (
        <>
            <GlobalStyle />
            <LoginContainer>
                <StyledLogo src={Logo} alt='Logo' />
                <LoginForm onSubmit={handleSubmit}>
                    <Title>비밀번호 찾기</Title>
                    <FormGroup>
                        <FieldWrapper>
                            <Label htmlFor='email'>Email</Label>
                            <InputField
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label htmlFor='password'>Password</Label>
                            <InputField
                                type='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FieldWrapper>
                        <StyledBigButton type='submit'>로그인</StyledBigButton>
                        <BlankContainer>OR</BlankContainer>
                        <SocialLoginButton
                            bgColor={Theme.colors.white}
                            color={Theme.colors.black}
                        >
                            <img src={GoogleLogo} alt='Google Logo' />
                            Sign With Google
                        </SocialLoginButton>
                        <SocialLoginButton
                            bgColor='#FEE500'
                            color={Theme.colors.black}
                        >
                            <img src={KakaoLogo} alt='Kakao Logo' />
                            Sign With Kakao
                        </SocialLoginButton>
                        <Footer>
                            <div>
                                이메일을 잊어버렸나요?
                                <FooterLink href='/findid'>
                                    이메일 찾기
                                </FooterLink>
                            </div>
                            <div>
                                비밀번호를 잊어버렸나요?
                                <FooterLink href='/findpassword'>
                                    비밀번호 찾기
                                </FooterLink>
                            </div>
                            <div>
                                계정이 없으신가요?{' '}
                                <FooterLink href='/join'>회원가입</FooterLink>
                            </div>
                        </Footer>
                    </FormGroup>
                </LoginForm>
            </LoginContainer>
        </>
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
const Title = styled.h2`
    ${Theme.fonts.button}
    color: ${Theme.colors.white};
    text-align: center;
`;
const StyledLogo = styled.img`
    width: 300px;
    margin-bottom: 20px;
`;

const SocialLoginButton = styled.button`
    position: relative;
    margin: 10px 0;
    border: none;
    ${Theme.fonts.button}
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    width: 100%;
    height: 48.26px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 69px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
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
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    width: 100%;
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

const StyledBigButton = styled(BigButton)`
    width: 100%;
`;
