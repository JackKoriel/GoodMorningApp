import React, { useState } from "react";
import styled from "styled-components";
import { db } from "../../../utility/firebase";
import { RiMailSendLine } from "react-icons/ri";

const SendMessages = ({ user, scroll, roomId }) => {
  const [message, setMessage] = useState("");

  const sendingMessage = async (ev) => {
    ev.preventDefault();

    const { _id, displayName, avatarSrc } = user;
    const date = new Date();

    await db.collection(`roomId_${roomId}`).add({
      displayName,
      text: message,
      photoURL: avatarSrc,
      uid: _id,
      createdAt: date.toISOString(),
    });
    setMessage("");
    scroll.current.scrollTop =
      scroll.current.scrollHeight - scroll.current.clientHeight;
  };

  return (
    <>
      <form
        onSubmit={(ev) => sendingMessage(ev)}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <SendMessageContainer>
          <Input
            placeholder="Write a message..."
            type="text"
            value={message}
            onChange={(ev) => setMessage(ev.target.value)}
          />
          <Button type="submit">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <span>Send</span>{" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <RiMailSendLine size={20} />
              </div>
            </div>
          </Button>
        </SendMessageContainer>
      </form>
    </>
  );
};

const SendMessageContainer = styled.div`
  bottom: 0;
  display: flex;
  height: 40px;
  width: 90%;
  padding: 10px;
  background-color: var(--gold-color);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  margin: 0px 10px;
  width: 100%;
  font-size: 14px;
  border: 0;
  color: black;
  background-color: transparent;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  padding: 0 5px;
`;
const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 20px;
  background: var(--blue-color);
  color: white;
  width: 100px;
  padding: 0px 30px;
  border: none;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export default SendMessages;
