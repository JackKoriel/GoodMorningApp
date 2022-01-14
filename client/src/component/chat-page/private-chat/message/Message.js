import React from "react";
import styled from "styled-components";
import moment from "moment";
// import { Avatar } from "@material-ui/core";

const Message = ({ userAvatar, receiverAvatar, message, own }) => {
  return (
    <MessageContainer className={own ? "own" : ""}>
      <MessageTop className={own ? "own" : ""}>
        {own ? (
          <MessageImg src={userAvatar} alt="Avatar" />
        ) : (
          <MessageImg src={receiverAvatar} alt="Avatar" />
          // <Avatar style={{ margin: "0 10px" }} />
        )}
        <MessageText className={own ? "own" : ""}>{message.text}</MessageText>
      </MessageTop>
      <MessageBottom>{moment(message.timestamp).calendar()}</MessageBottom>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  &.own {
    align-items: flex-end;
  }
`;

const MessageTop = styled.div`
  display: flex;
  margin-top: 20px;
  &.own {
    flex-direction: row-reverse;
  }
`;

const MessageImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin-left: 10px;
`;

const MessageText = styled.p`
  padding: 10px;
  max-width: 350px;
  border-radius: 20px;
  border: 1px solid var(--yellow-color);
  background-color: var(--brown-color);
  border-top-left-radius: 0px;
  float: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  &.own {
    border-top-right-radius: 0px;
    border-top-left-radius: 20px;
    border: 1px solid var(--brown-color);
    background-color: var(--yellow-color);
  }
`;

const MessageBottom = styled.div`
  font-size: 0.7em;
  margin: 10px 20px;
  color: grey;
`;

export default Message;
