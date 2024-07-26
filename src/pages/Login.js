import React, { useState } from 'react';
import styled from 'styled-components';
import GoogleLogo from '../img/GoogleLogo.svg';
import KakaoLogo from '../img/KakaoLogo.svg';
import LoginBackgroundImg from '../img/LoginBackgroundColor.svg';
import Logo from '../img/Logo.svg';
import GlobalStyle from '../styles/GlobalStyle.js';
import { Theme } from '../styles/Theme.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', { email, password });
    };

    return (
        <>
            <GlobalStyle />
            <LoginContainer>
                <BackgroundImg src={LoginBackgroundImg} alt="Login Background" />
                <StyledLogo src={Logo} alt="Logo" />
                <LoginForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <SocialLoginButton bgColor={Theme.colors.white} color={Theme.colors.black}>
                            <img src={GoogleLogo} alt="Google Logo" />
                            Sign With Google
                        </SocialLoginButton>
                        <SocialLoginButton bgColor="#FEE500" color={Theme.colors.black}>
                            <img src={KakaoLogo} alt="Kakao Logo" />
                            Sign With Kakao
                        </SocialLoginButton>
                        <BlankContainer>OR</BlankContainer>
                        <FieldWrapper>
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </FieldWrapper>
                        <FieldWrapper>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </FieldWrapper>
                        <SubmitButton type="submit">로그인</SubmitButton>
                        <FooterText>
                            <div>
                                이메일을 잊어버렸나요?<FooterLink href="#">이메일 찾기</FooterLink>
                            </div>
                            <div>
                                비밀번호를 잊어버렸나요?<FooterLink href="#">비밀번호 찾기</FooterLink>
                            </div>
                            <div>
                                계정이 없으신가요? <FooterLink href="#">회원가입</FooterLink>
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
    position: relative;
`;

const BackgroundImg = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`;

const StyledLogo = styled.img`
    position: absolute;
    top: 99px;
    width: 360px;
    height: 234.58px;
`;

const SocialLoginButton = styled.button`
    position: relative;
    margin: 10px 0;
    border: none;
    ${Theme.fonts.button}
    background-color: ${props => props.bgColor};
    color: ${props => props.color};
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
    position: absolute;
    width: 546px;
    height: 506px;
    left: calc(50% - 546px/2);
    top: 366px;
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

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-right: 40px;
    width: 47.39px;
    height: 24.72px;
    ${Theme.fonts.label}
    color: ${Theme.colors.white};
`;

const Input = styled.input`
    box-sizing: border-box;
    width: calc(100% - 145px);
    background: ${Theme.colors.white};
    border: 1px solid ${Theme.colors.borderGray};
    border-radius: 20px;
    padding: 0 20px;
    width: 359px;
    margin: 0 90px 0 0;
    height: 41px;
`;

const SubmitButton = styled.button`
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
    
    &::before, &::after {
        content: '';
        flex: 1;
        border-top: 1px solid #CDCDCD;
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