import React, { useContext } from "react";
import { currentUserContext } from "./CurrentUserContext";
import SuneriseLogo from "./SuneriseLogo";
import { FiUser } from "react-icons/fi";
import { BsStar } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { FaGlasses } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import PostBox from "./PostBox";
import NavbarOptions from "./NavbarOptions";
import styled from "styled-components";
import { PostContext } from "./PostContext";
import { useHistory } from "react-router-dom";

const SideNavbar = () => {
  let history = useHistory();
  const {
    user: { handle, avatarSrc },
  } = useContext(currentUserContext);

  const { setModalStatus } = useContext(PostContext);

  const onClickVisiblityHandle = () => {
    setModalStatus(true);
    history.push(`/`);
  };

  return (
    <SidebarContainer>
      {/* site icon */}
      <SuneriseLogo />
      <PostBox avatarSrc={avatarSrc} />
      {/* sidebarOptions */}
      <NavbarOptions exact={true} to="/" Icon={FiHome} text="Home" />
      <NavbarOptions to="/favorite" Icon={BsStar} text="Favorite" />
      <NavbarOptions to="/reading-list" Icon={FaGlasses} text="Reading List" />
      <NavbarOptions to={`/${handle}`} Icon={FiUser} text="Profile" />
      <NavbarOptions to={`/settings`} Icon={FiSettings} text="Settings" />
      <NavbarOptions to={`/logout`} Icon={RiLogoutBoxLine} text="Logout" />
      {/* Button -> Tweet */}
      <Button onClick={onClickVisiblityHandle}>DOODLE-DOO</Button>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  min-width: 210px;
  height: 100vh;
  border-right: 1px solid var(--yellow-color);
  padding-right: 25px;
  padding-left: 25px;
  flex: 0.3;
  background-color: var(--brown-color);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Button = styled.button`
  margin-top: 40px;
  background-color: var(--blue-color);
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: white;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &&:focus {
    outline: 0;
  }
  &&:hover:after {
    bottom: 2px;
    left: 2px;
  }
  &&:after {
    content: "";
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }
`;

// const Tabs = styled(NavLink)`
//   text-decoration: none;
// `;

export default SideNavbar;
