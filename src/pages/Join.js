import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BigButton from '../components/LoginJoin/BigButton.js';
import Footer, { FooterLink } from '../components/LoginJoin/Footer.js';
import InputField from '../components/LoginJoin/InputField.js';
import Label from '../components/LoginJoin/Label.js';
import SmallButton from '../components/LoginJoin/SmallButton.js';
import LoginBackgroundImg from '../img/LoginBackgroundColor.svg';
import Logo from '../img/Logo.svg';
import GlobalStyle from '../styles/GlobalStyle.js';
import { Theme } from '../styles/Theme.js';

const Join = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState({
        year: '',
        month: '',
        day: '',
    });
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [emailNumber, setEmailNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Submitted:', {
            name,
            phone,
            birthDate,
            gender,
            email,
            emailNumber,
            password,
            passwordCheck,
        });
        navigate('/login');
    };

    return (
        <>
            <GlobalStyle />
            <JoinContainer>
                <StyledLogo src={Logo} alt='Logo' />
                <JoinForm onSubmit={handleSubmit}>
                    <FieldWrapper>
                        <Label htmlFor='name'>닉네임</Label>
                        <InputField
                            type='text'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='phone'>전화번호</Label>
                        <InputField
                            type='text'
                            id='phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='birthDate'>생년월일</Label>
                        <BirthDateWrapper>
                            <InputField
                                type='text'
                                placeholder='YYYY'
                                value={birthDate.year}
                                onChange={(e) =>
                                    setBirthDate({
                                        ...birthDate,
                                        year: e.target.value,
                                    })
                                }
                            />
                            <InputField
                                type='text'
                                placeholder='MM'
                                value={birthDate.month}
                                onChange={(e) =>
                                    setBirthDate({
                                        ...birthDate,
                                        month: e.target.value,
                                    })
                                }
                            />
                            <InputField
                                type='text'
                                placeholder='DD'
                                value={birthDate.day}
                                onChange={(e) =>
                                    setBirthDate({
                                        ...birthDate,
                                        day: e.target.value,
                                    })
                                }
                            />
                        </BirthDateWrapper>
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='gender'>성별</Label>
                        <GenderWrapper>
                            <GenderBox
                                id='male'
                                name='gender'
                                isSelected={gender === 'male'}
                                onClick={() => setGender('male')}
                            >
                                남성
                            </GenderBox>
                            <GenderBox
                                id='female'
                                name='gender'
                                isSelected={gender === 'female'}
                                onClick={() => setGender('female')}
                            >
                                여성
                            </GenderBox>
                        </GenderWrapper>
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='email'>이메일</Label>
                        <InputField
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <SmallButton>인증</SmallButton>
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='emailNumber'>이메일 인증번호</Label>
                        <InputField
                            type='text'
                            id='emailNumber'
                            value={emailNumber}
                            onChange={(e) => setEmailNumber(e.target.value)}
                        />
                        <SmallButton>확인</SmallButton>
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='password'>비밀번호</Label>
                        <InputField
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='passwordCheck'>비밀번호 확인</Label>
                        <InputField
                            type='password'
                            id='passwordCheck'
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                    </FieldWrapper>
                    <BigButton type='submit'>회원가입</BigButton>
                    <Footer>
                        <div>
                            이미 계정이 있으신가요?{' '}
                            <FooterLink href='/login'>로그인</FooterLink>
                        </div>
                    </Footer>
                </JoinForm>
            </JoinContainer>
        </>
    );
};

export default Join;

const StyledLogo = styled.img`
    width: 360px;
    height: 234.58px;
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
    width: 100vw;
`;

const FieldWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;

const BirthDateWrapper = styled.div`
    display: flex;
    gap: 10px;
    max-width: 350px;
    width: 100%;

    input {
        flex: 1;
    }
`;

const GenderWrapper = styled.div`
    display: flex;
    gap: 10px;
`;

const GenderBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 180px;
    width: 100vw;
    height: 40px;
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
`;
