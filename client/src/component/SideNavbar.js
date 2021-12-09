import React from "react";

import SuneriseLogo from "./SuneriseLogo";
import { FiUser } from "react-icons/fi";
import { BsStar } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { FaGlasses } from "react-icons/fa";

import NavbarOptions from "./NavbarOptions";
import styled from "styled-components";

const SideNavbar = () => {
  return (
    <SidebarContainer>
      {/* site icon */}
      <SuneriseLogo />
      {/* sidebarOptions */}
      <NavbarOptions exact={true} to="/" Icon={FiHome} text="Home" />
      <NavbarOptions to="/favorite" Icon={BsStar} text="Favorite" />
      <NavbarOptions to="/reading-list" Icon={FaGlasses} text="Reading List" />
      <NavbarOptions to="/profile" Icon={FiUser} text="Profile" />
      {/* Button -> Tweet */}
      <Button>DOODLE-DOO</Button>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  min-width: 210px;
  /* margin-left: 100px;
  margin-top: 30px; */
  /* border: 1px solid red; */
  border-right: 1px solid var(--morning-background);
  margin-top: 20px;
  margin-left: 20px;
  padding-right: 5px;
  /* flex: 1 0.5 0px; */
  flex: 0.25;
`;

const Button = styled.button`
  padding: 15px 20px;
  /* width: 160px; */
  width: 100%;
  color: white;
  border: none;
  border-radius: 30px;
  background-color: var(--primary);
  /* margin-left: 20px; */
  margin-top: 20px;
  font-weight: 700;
  transition: all 300ms ease-out;
  &&:active {
    transform: scale(0.8);
  }
`;

// const Tabs = styled(NavLink)`
//   text-decoration: none;
// `;

export default SideNavbar;
