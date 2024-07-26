import React from 'react';
import styled from 'styled-components';
import { Theme } from '../styles/Theme.js';

export const FieldWrapper = ({ children }) => (
    <StyledFieldWrapper>{children}</StyledFieldWrapper>
);

export const Input = ({ id, type, value, onChange, placeholder, required }) => (
    <StyledInput
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
    />
);

export const Button = ({ children, onClick, type }) => (
    <StyledButton onClick={onClick} type={type}>
        {children}
    </StyledButton>
);

const StyledFieldWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
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

const StyledButton = styled.button`
    margin-left: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    background: ${Theme.colors.lightBlue};
    color: ${Theme.colors.black};
    cursor: pointer;

    &:hover {
        background: ${Theme.colors.darkBlue};
    }
`;
