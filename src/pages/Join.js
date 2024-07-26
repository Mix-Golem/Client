import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, FieldWrapper, Input } from '../components/Common.js';
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
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            type='text'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='phone'>Phone</Label>
                        <Input
                            type='text'
                            id='phone'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='birthDate'>BirthDate</Label>
                        <BirthDateWrapper>
                            <Input
                                type='text'
                                placeholder='YYYY'
                                value={birthDate.year}
                                onChange={(e) =>
                                    setBirthDate({
                                        ...birthDate,
                                        year: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                type='text'
                                placeholder='MM'
                                value={birthDate.month}
                                onChange={(e) =>
                                    setBirthDate({
                                        ...birthDate,
                                        month: e.target.value,
                                    })
                                }
                                required
                            />
                            <Input
                                type='text'
                                placeholder='DD'
                                value={birthDate.day}
                                onChange={(e) =>
                                    setBirthDate({
                                        ...birthDate,
                                        day: e.target.value,
                                    })
                                }
                                required
                            />
                        </BirthDateWrapper>
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='gender'>Gender</Label>
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
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            type='email'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type='button'>인증</Button>
                    </FieldWrapper>
                    <FieldWrapper>
                        <Label htmlFor='emailNumber'>Email Number</Label>
                        <Input
                            type='text'
                            id='emailNumber'
                            value={emailNumber}
                            onChange={(e) => setEmailNumber(e.target.value)}
                            required
                        />
                        <Button type='button'>확인</Button>
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
                    <FieldWrapper>
                        <Label htmlFor='passwordCheck'>Password Check</Label>
                        <Input
                            type='password'
                            id='passwordCheck'
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                            required
                        />
                    </FieldWrapper>
                    <BigButton type='submit'>회원가입</BigButton>
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
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: ${Theme.colors.white};
    max-width: 500px;
    width: 100vw;
`;

const Label = styled.label`
    width: 120px;
    margin-right: 10px;
    ${Theme.fonts.label}
    text-align: center;
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
