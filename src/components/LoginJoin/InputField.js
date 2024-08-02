import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme.js';

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <FieldWrapper>
      <LabelWrapper>
        <Label htmlFor={id}>{label}</Label>
        <StyledInput
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      </LabelWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FieldWrapper>
  );
};

export default InputField;

const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Label = styled.label`
  width: 120px;
  margin-right: 10px;
  ${Theme.fonts.label}
  text-align: center;
  color: ${Theme.colors.white};
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
  margin-left: 150px;
  margin-top: 10px;
  font-size: 12px;
  text-align: left;
  width: 250px;
`;
