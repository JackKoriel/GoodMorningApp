import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { currentUserContext } from "./CurrentUserContext";
import { PostContext } from "./PostContext";

const PostBox = () => {
  const {
    user: { status, avatarSrc, handle },
  } = useContext(currentUserContext);
  let placeholderText = `How is your mood today ${handle}?`;
  // const onClickVisiblityHandle = () => {
  //   setModalStatus(true);
  // };

  return (
    <MasterContainer>
      <Form>
        <AvatarContainer>
          <Avatar src={avatarSrc} />
          <Input placeholder={placeholderText} type="text" />
        </AvatarContainer>

        <Button>Mood-on!</Button>
      </Form>
    </MasterContainer>
  );
};

const MasterContainer = styled.div`
  padding-bottom: 10px;

  padding-right: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
`;

const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 30px;
  padding-left: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  /* border: 1px solid green; */
  width: 100%;
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
export default PostBox;
