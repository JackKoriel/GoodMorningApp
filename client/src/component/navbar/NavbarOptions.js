import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const NavbarOptions = ({ to, exact, text, Icon, mobile }) => {
  return (
    <SidebarIcons
      activeStyle={{ color: "var(--morning-color)" }}
      to={to}
      exact={exact}
      className={mobile ? "mobile" : ""}
    >
      <Icon style={iconStyle} />
      <Text>{text}</Text>
    </SidebarIcons>
  );
};

const SidebarIcons = styled(NavLink)`
  margin-top: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  border-bottom: 1px solid var(--blue-color);
  transition: 200ms ease-in;
  &&:hover {
    background-color: #e8f5fe;
    border-radius: 30px;
    color: var(--morning-color);
    transition: color 100ms ease-out;
  }
  &.mobile {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    margin-top: 10px;
    &.mobile {
      display: flex;
    }
  }
  @media screen and (max-width: 820px) {
    margin-top: 2px;
    &.mobile {
      display: flex;
    }
  }
`;

const Text = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-right: 20px;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const iconStyle = {
  padding: "15px 15px",
  fontSize: "22px",
};
export default NavbarOptions;
