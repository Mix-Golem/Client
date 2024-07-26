import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FieldWrapper, Input } from '../components/Common.js';
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
        navigate('/Join');
    };

    return (
        <>
            <GlobalStyle />
            <LoginContainer>
                <StyledLogo src={Logo} alt='Logo' />
                <LoginForm onSubmit={handleSubmit}>
                    <FormGroup>
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
                        <BlankContainer>OR</BlankContainer>
                        <FieldWrapper>
                            <Label htmlFor='email'>E-mail</Label>
                            <Input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                type='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FieldWrapper>
                        <BigButton type='submit'>로그인</BigButton>
                        <FooterText>
                            <div>
                                이메일을 잊어버렸나요?
                                <FooterLink href='#'>이메일 찾기</FooterLink>
                            </div>
                            <div>
                                비밀번호를 잊어버렸나요?
                                <FooterLink href='#'>비밀번호 찾기</FooterLink>
                            </div>
                            <div>
                                계정이 없으신가요?{' '}
                                <FooterLink href='#'>회원가입</FooterLink>
                            </div>
                        </FooterText>
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

const StyledLogo = styled.img`
    width: 360px;
    height: 234.58px;
    margin-bottom: 20px;
`;

const SocialLoginButton = styled.button`
    position: relative;
    margin: 10px 0;
    border: none;
    ${Theme.fonts.button}
    background-color: ${(props) => props.bgColor};
    color: ${(props) => props.color};
    width: 373.22px;
    height: 48.26px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 69px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;

    img {
        width: 24px;
        height: 24px;
        margin-right: 10px;
    }
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    background-color: ${Theme.colors.black};
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: 1;
    width: 546px;
`;

const FormGroup = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    width: 100%;
`;

const Label = styled.label`
    display: block;
    margin-right: 40px;
    width: 80px;
    ${Theme.fonts.label}
    color: ${Theme.colors.white};
    text-align: center;
`;

const BigButton = styled.button`
    width: 362.56px;
    height: 49.44px;
    ${Theme.fonts.button}
    color: ${Theme.colors.black};
    background: ${Theme.colors.lightBlue};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: ${Theme.colors.darkBlue};
    }
`;

const BlankContainer = styled.div`
    position: relative;
    width: 375px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    z-index: 2;
    margin: 10px 0;

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

const FooterText = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    line-height: 160%;
    color: ${Theme.colors.gray};

    > div {
        display: flex;
        flex-direction: row;
        align-items: center;
        ${Theme.fonts.footerText}
        margin-bottom: 5px;
        justify-content: space-between;
    }

    a {
        ${Theme.fonts.footerText}
        color: ${Theme.colors.white};
        text-decoration: none;
        margin-left: 20px;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const FooterLink = styled.a`
    ${Theme.fonts.footerText}
    color: ${Theme.colors.white};
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
