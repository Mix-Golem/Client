import React from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/Theme.js';

const Footer = ({ children }) => {
  return <FooterText>{children}</FooterText>;
};

export default Footer;

const FooterText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  line-height: 160%;
  color: ${Theme.colors.gray};

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    ${Theme.fonts.footerText}
    margin-bottom: 5px;
    justify-content: space-between;
  }

  a {
    ${Theme.fonts.footerText}
    color: ${Theme.colors.white};
    text-decoration: none;
    margin-left: 20px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const FooterLink = styled.a`
  ${Theme.fonts.footerText}
  color: ${Theme.colors.white};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
