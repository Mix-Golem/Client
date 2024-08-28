import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme.js';

const InputField = React.forwardRef(
  ({ id, label, type, value, onChange, placeholder, error }, ref) => {
    return (
      <FieldWrapper>
        <LabelWrapper>
          <Label htmlFor={id}>{label}</Label>
          <InputWrapper>
            <StyledInput
              id={id}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required
              ref={ref} // ref를 DOM 요소에 전달
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputWrapper>
        </LabelWrapper>
      </FieldWrapper>
    );
  }
);

// displayName 추가
InputField.displayName = 'InputField';

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

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  background: ${Theme.colors.white};
  border: 1px solid ${Theme.colors.borderGray};
  border-radius: 20px;
  padding: 0 20px;
  height: 41px;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: ${Theme.colors.red};
  margin-top: 10px;
  margin-left: 10px;
  font-size: 12px;
  width: 100%;
  text-align: left;
`;
