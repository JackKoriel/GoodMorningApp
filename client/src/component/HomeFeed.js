import React, { useState } from "react";
import styled from "styled-components";
import PostBox from "./PostBox";
import PostModal from "./PostModal";

const HomeFeed = () => {
  const [modalStatus, setModalStatus] = useState(false);
  return (
    <MasterContainer>
      <Header>
        <PostBox setModalStatus={setModalStatus} />
      </Header>
      <PostModal modalStatus={modalStatus} setModalStatus={setModalStatus} />
    </MasterContainer>
  );
};

const MasterContainer = styled.div`
  flex: 0.5;
  border-right: 1px solid var(--morning-background);
  min-width: fit-content;
  overflow-y: scroll;
  height: auto;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  /* position: sticky; */
  top: 0;
  background-color: white;
  z-index: 100;
  border: 1px solid var(--morning-background);
  padding: 10px 20px;
`;
export default HomeFeed;
