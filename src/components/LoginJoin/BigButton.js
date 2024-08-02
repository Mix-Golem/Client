import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme.js';

const BigButton = ({ type, children }) => {
  return <StyledButton type={type}>{children}</StyledButton>;
};

export default BigButton;

const StyledButton = styled.button`
  width: 100%;
  height: 49.44px;
  ${Theme.fonts.button}
  color: ${Theme.colors.black};
  background: ${Theme.colors.lightBlue};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  border-radius: 20px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${Theme.colors.darkBlue};
  }
`;
