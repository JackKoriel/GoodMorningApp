import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../utility/firebase";
import SendMessages from "./SendMessages";
import moment from "moment";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { HeartSpinner } from "react-spinners-kit";

const Chat = ({ user, roomId }) => {
  let history = useHistory();
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    db.collection(`roomId_${roomId}`)
      .orderBy(`createdAt`, `desc`)
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
        setStatus("active");
      });
  }, [roomId]);

  return (
    <>
      {status === "idle" ? (
        <Progress>
          <HeartSpinner color="var(--blue-color)" /> Loading...
        </Progress>
      ) : (
        <MasterWrapper>
          <ReturnBar>
            <ReturnButton onClick={() => history.goBack()}>
              <IoArrowBackCircleOutline size={30} />
            </ReturnButton>
          </ReturnBar>
          <MessagesContainer ref={scroll}>
            {messages.map(
              ({ id, text, photoURL, uid, displayName, createdAt }, index) => (
                <div>
                  {uid === user._id ? (
                    <SentMessageContainer key={id}>
                      <UserAvatar src={photoURL} alt="avatar" key={id} />
                      <SentMessageDetails>
                        <SentMessage key={id}>
                          <Text>{text}</Text>
                        </SentMessage>
                        <Time>{moment(createdAt).calendar()}</Time>
                      </SentMessageDetails>
                    </SentMessageContainer>
                  ) : (
                    <ReceivedMessageContainer key={id}>
                      <UserAvatar src={photoURL} alt="avatar" key={id} />
                      <ReceivedMessageDetails>
                        <Sender>{displayName}</Sender>
                        <ReceivedMessage key={id}>
                          <Text>{text}</Text>
                        </ReceivedMessage>
                        <Time>{moment(createdAt).calendar()}</Time>
                      </ReceivedMessageDetails>
                    </ReceivedMessageContainer>
                  )}
                </div>
              )
            )}
          </MessagesContainer>
          <SendMessages scroll={scroll} user={user} roomId={roomId} />
        </MasterWrapper>
      )}
    </>
  );
};

const Progress = styled.div`
  background-color: var(--beige-color);
  width: 650px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const MasterWrapper = styled.div`
  max-width: 700px;
  width: 650px;
  display: flex;
  flex-direction: column;
  height: 99vh;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow-y: hidden;
`;

const MessagesContainer = styled.div`
  position: relative;
  display: flex;

  flex-direction: column-reverse;
  flex-flow: column-reverse;

  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 86vh;

  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
  margin-top: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  padding: 5px 10px;
  flex-flow: bottom;
`;

const SentMessageDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const ReceivedMessageDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Sender = styled.div`
  font-size: 14px;
  align-self: flex-start;
  margin-left: 10px;
  margin-bottom: 3px;
  font-weight: 700;
`;
const SentMessageContainer = styled(MessageContainer)`
  flex-direction: row-reverse;
`;

const Time = styled.div`
  font-size: 0.7em;
  margin: 3px 20px;
  color: grey;
`;

const ReceivedMessageContainer = styled(MessageContainer)``;

const Message = styled.div`
  display: flex;
  border-radius: 30px;
  align-items: center;
  color: black;
  padding: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  max-width: 350px;
`;

const SentMessage = styled(Message)`
  margin-right: 10px;
  background-color: var(--yellow-color);
  color: black;
  border-top-right-radius: 0px;
  border: 1px solid var(--brown-color);
  flex-direction: row-reverse;
  text-align: end;
  float: right;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ReceivedMessage = styled(Message)`
  margin-left: 10px;
  border: 1px solid var(--yellow-color);
  background-color: var(--brown-color);
  border-top-left-radius: 0px;
  float: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  height: 45px;
  border: 2px solid white;
`;

const Text = styled.p`
  padding: 0px 5px;
  font-size: 1em;
  margin-left: 10px;
  margin-right: 10px;
  overflow-wrap: break-word;
`;

const ReturnBar = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  background-color: var(--gold-color);
  border-radius: 30px;
  margin: 0 5px;
`;

const ReturnButton = styled.button`
  margin-top: 5px;
  background: none;
  color: inherit;
  border: none;
  font: inherit;
  cursor: pointer;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.2);
  }
`;

export default Chat;
