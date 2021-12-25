import React, { useContext } from "react";
import { currentUserContext } from "../CurrentUserContext";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import Chat from "./Chat";

const ChatSys = () => {
  const { roomId } = useParams();
  const { user } = useContext(currentUserContext);
  return (
    <>
      {user.status === "loading" ? (
        <Progress>
          <CircularProgress /> Loading...
        </Progress>
      ) : (
        <Wrapper>
          <Chat user={user} roomId={roomId} />
        </Wrapper>
      )}
    </>
  );
};

const Progress = styled.div`
  width: 700px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
`;

const slideIn = keyframes`
  0% {
    -webkit-transform: translateX(600px);
            transform: translateX(600px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
            transform: translateX(0);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  background: var(--beige-color);
  height: auto;
  animation: ${slideIn} 0.4s ease-out both;
`;

export default ChatSys;
