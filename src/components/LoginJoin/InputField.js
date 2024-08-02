import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme.js';

const InputField = ({ id, type, value, onChange, placeholder }) => {
    return (
        <StyledInput
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    );
};

export default InputField;

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
