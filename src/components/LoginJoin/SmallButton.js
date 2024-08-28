import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme.js';

const Button = ({ onClick, children, type = 'button' }) => {
  return (
    <StyledButton onClick={onClick} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  margin-left: 10px;
  width: 120px;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  background: linear-gradient(
    45deg,
    ${Theme.colors.lightBlue},
    ${Theme.colors.darkBlue}
  );
  color: ${Theme.colors.white};
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    background: linear-gradient(
      45deg,
      ${Theme.colors.darkBlue},
      ${Theme.colors.lightBlue}
    );
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
