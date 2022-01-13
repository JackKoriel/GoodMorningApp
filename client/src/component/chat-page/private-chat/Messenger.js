import React, { useContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SideNavbar from "../../SideNavbar";
import Conversations from "./conversations/Conversations";
import Message from "./message/Message";
import { RiMailSendLine } from "react-icons/ri";
import { currentUserContext } from "../../CurrentUserContext";
import { io } from "socket.io-client";
import moment from "moment";

const Messenger = () => {
  const { user } = useContext(currentUserContext);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [sendButtonStatus, setSendButtonStatus] = useState(true);
  const [receiver, setReceiver] = useState(null);

  // get receiver avatar image
  useEffect(() => {
    if (currentChat) {
      const friendId = currentChat.members.find(
        (member) => member !== user._id
      );
      fetch(`/api/user/${friendId}`)
        .then((res) => res.json())
        .then((res) => {
          setReceiver(res.data);
        });
    }
  }, [currentChat]);

  //for auto scrolll
  const scroll = useRef();

  //for socket io <<ws stands for web socket>>
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("getMessage", (data) => {
      console.log("data from socket: ", data);
      setReceivedMessage({
        sender: data.senderId,
        text: data.text,
        timestamp: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    receivedMessage &&
      currentChat?.members.includes(receivedMessage.sender) &&
      setMessages((previous) => [...previous, receivedMessage]);
  }, [receivedMessage, currentChat]);

  useEffect(() => {
    //sending to server
    socket.current.emit("addUser", user._id);
    //taking from server
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user]);

  // fetch all user's conversations
  useEffect(() => {
    fetch(`/api/conversation/${user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setConversations(data.data);
      })
      .catch((err) => {});
  }, [user._id]);

  //fetch all messages
  useEffect(() => {
    fetch(`/api/messages/${currentChat?._id}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data.data);
      })
      .catch((err) => {});
  }, [currentChat, sendButtonStatus]);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setSendButtonStatus(false);

    //get friend Id
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    //send to socket server
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    //send a messages with POST
    fetch(`/api/messages`, {
      method: "POST",
      body: JSON.stringify({
        conversationId: currentChat._id,
        sender: user._id,
        text: newMessage,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 201) {
          setSendButtonStatus(true);
          setNewMessage("");
        }
      })
      .catch((err) => {});
  };

  //for auto scroll
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //random id creation
  let RandoId = () => Math.floor(Math.random() * 1400000000);
  return (
    <MessengerContainer>
      <SideNavbar />
      <ChatBox>
        <ChatBoxWrapper>
          {currentChat ? (
            <>
              <ChatBoxTop>
                {messages.map((message) => {
                  return (
                    <div key={RandoId()} ref={scroll}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                        userAvatar={user.avatarSrc}
                        receiverAvatar={receiver?.avatarSrc}
                      />
                    </div>
                  );
                })}
              </ChatBoxTop>
              <ChatBoxBottom>
                <Input
                  placeholder="Write a message..."
                  type="text"
                  value={newMessage}
                  onChange={(ev) => setNewMessage(ev.target.value)}
                />
                <Button type="submit" onClick={(ev) => handleSubmit(ev)}>
                  {!sendButtonStatus ? (
                    <i className="fas fa-ring fa-spin" />
                  ) : (
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
                  )}
                </Button>
              </ChatBoxBottom>
            </>
          ) : (
            <NoConvo>Open a conversation to start a chat.</NoConvo>
          )}
        </ChatBoxWrapper>
      </ChatBox>
      <ChatMenu>
        <ChatMenuWrapper>
          <ChatMenuInput placeholder="Search for friends" />
          <ConverstaionWrapper>
            {conversations.map((convo) => {
              return (
                <div key={convo._id} onClick={() => setCurrentChat(convo)}>
                  <Conversations conversation={convo} currentUser={user} />
                </div>
              );
            })}
          </ConverstaionWrapper>
        </ChatMenuWrapper>
      </ChatMenu>
    </MessengerContainer>
  );
};

const MessengerContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 76vw;
  height: 100vh;
  z-index: 100;
  background-color: var(--beige-color);
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow-y: hidden;
`;

const ChatBox = styled.div`
  width: 700px;
  flex: 0.6;
`;

const ChatMenu = styled.div`
  /* width: 100%; */
  flex: 0.3;
  border-left: 1px solid var(--yellow-color);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow-y: hidden;
`;

const ChatMenuInput = styled.input`
  width: 90%;
  padding: 10px 0;
  border: none;
  border-bottom: 1px solid gray;
  background-color: transparent;
`;

const ChatBoxWrapper = styled.div`
  position: relative;
  padding: 10px;
  height: 90%;
`;

const NoConvo = styled.span`
  position: absolute;
  top: 10%;
  font-size: 50px;
  color: gray;
  text-align: center;
  cursor: default;
`;

const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChatBoxBottom = styled.div`
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 40px;
  width: 90%;
  padding: 10px;
  background-color: var(--gold-color);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  margin-top: 10px;
  margin-bottom: 15px;
  margin-left: 25px;
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

const ChatMenuWrapper = styled.div`
  padding: 10px;
  height: 100%;
  overflow-y: hidden;
`;
const ConverstaionWrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Messenger;
