import { Avatar } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HeartSpinner } from "react-spinners-kit";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((member) => {
      return member !== currentUser._id;
    });
    friendId &&
      fetch(`/api/user/${friendId}`)
        .then((res) => res.json())
        .then((user) => {
          setUser(user.data);
        });
  }, [currentUser, conversation]);
  return (
    <>
      {!user ? (
        <Progress>
          <HeartSpinner color="var(--blue-color)" />
        </Progress>
      ) : (
        <Conversation>
          {user?.avatarSrc !== "" ? (
            <ConversationImg src={user.avatarSrc} alt="Avatar" />
          ) : (
            <Avatar style={{ marginRight: "20px" }} />
          )}
          <ConversationName>{user?.displayName}</ConversationName>
        </Conversation>
      )}
    </>
  );
};

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  height: 120px;
`;

const Conversation = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: 200ms;
  &:hover {
    transform: scale(1.05);
    background-color: var(--gold-color);
    /* border-radius: 20px; */
  }
`;

const ConversationImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  /* margin-right: 20px; */
`;

const ConversationName = styled.span`
  font-weight: 500;
  margin-left: 10px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export default Conversations;
