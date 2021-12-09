import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Button } from "@material-ui/core";

const PostBox = ({ setModalStatus }) => {
  const onClickVisiblityHandle = () => {
    setModalStatus(true);
  };

  return (
    <MasterContainer>
      <Form>
        <AvatarContainer>
          <Avatar src="https://res.cloudinary.com/dhj5ncbxs/image/upload/v1638645775/onePiece/luffy-avatar_ulpfwt.png" />
          <Input placeholder="How is your mood today?" type="text" />
        </AvatarContainer>

        <Button onClick={onClickVisiblityHandle}>DOODLE-DO</Button>
      </Form>
    </MasterContainer>
  );
};

const MasterContainer = styled.div`
  padding-bottom: 10px;
  border-bottom: 8px solid var(--morning-background);
  padding-right: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
`;

const Input = styled.input`
  width: 50%;
  border: none;
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px solid green;
  width: 100%;
`;

export default PostBox;
