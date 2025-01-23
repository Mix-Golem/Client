import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img_Ad from '../img/Ad.png';
import img_Logo from '../img/Logo.svg';
import { Theme } from '../styles/Theme';

// Navbar component
const SideMenu = () => {
  return (
    <Sidebar>
      <Logo src={img_Logo} alt='Logo' />
      <NavLinks>
        <NavLink>
          <Link to='/'>Home</Link>
        </NavLink>
        <NavLink>
          <Link to='/create'>Create</Link>
        </NavLink>
        <NavLink>
          <Link to='/library'>Library</Link>
        </NavLink>
        <NavLink>
          <Link to='/social'>Social</Link>
        </NavLink>
      </NavLinks>
      <AdImage src={img_Ad} alt='Ad' />
    </Sidebar>
  );
};

export default SideMenu;

const Sidebar = styled.div`
  margin-top: 38px;
  margin-left: 18px;
  position: relative;
  width: 249px;
  height: 894px;

  background: ${Theme.colors.black};
  border-radius: 70px;
`;

const Logo = styled.img`
  display: block;
  margin-top: 37px;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  margin-top: 61px;
  padding: 0;
`;

const NavLink = styled.li`
  padding: 34px;
  text-align: center;
  ${Theme.fonts.navLink}

  & a {
    text-decoration: none;
    font-size: 35px;
    color: ${Theme.colors.white};
    display: block;
    transition: 0.3s;

    &:hover {
      color: ${Theme.colors.lightBlue};
    }
  }
`;

const AdImage = styled.img`
  width: 237px;
  height: 163px;
  left: 24px;
  top: 712px;
  border-radius: 40px;
`;
