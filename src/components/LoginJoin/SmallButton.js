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
