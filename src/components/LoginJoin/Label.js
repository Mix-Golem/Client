import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme.js';

const Label = ({ htmlFor, children }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;

const StyledLabel = styled.label`
  width: 120px;
  margin-right: 10px;
  ${Theme.fonts.label}
  ${Theme.fonts.label}
    text-align: center;
  color: ${Theme.colors.white};
`;
