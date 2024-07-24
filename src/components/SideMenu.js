import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Theme } from "../styles/Theme";
import img_Logo from "../img/Logo.svg";
import img_Ad from "../img/Ad.png";

const Sidebar = styled.div`
  position: absolute;
  width: 249px;
  height: 894px;
  left: 18px;
  top: 38px;

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

// Navbar component
const SideMenu = () => {
  return (
    <Sidebar>
      <Logo src={img_Logo} alt="Logo" />
      <NavLinks>
        <NavLink>
          <Link to="/">Home</Link>
        </NavLink>
        <NavLink>
          <Link to="/create">Create</Link>
        </NavLink>
        <NavLink>
          <Link to="/library">Library</Link>
        </NavLink>
        <NavLink>
          <Link to="/social">Social</Link>
        </NavLink>
      </NavLinks>
      <AdImage src={img_Ad} alt="Ad" />
    </Sidebar>
  );
};

export default SideMenu;
