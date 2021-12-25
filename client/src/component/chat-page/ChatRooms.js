import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Music from "./public-rooms/Music";
import Gaming from "./public-rooms/Gaming";
import Politics from "./public-rooms/Politics";

const ChatRooms = () => {
  const [privateValue, setPrivateValue] = useState("");

  const handleChangePrivateValue = (ev) => {
    setPrivateValue(ev.target.value);
  };

  return (
    <MasterContainer>
      <PublicRooms>
        <Music />
        <Gaming />
        <Politics />
      </PublicRooms>
      <PrivateRooms>
        <Text>Make your own private room and invite your friends</Text>
        <TextField
          onChange={(ev) => handleChangePrivateValue(ev)}
          id="outlined-size-small"
          placeholder="Create Private Room Code"
          variant="outlined"
          style={{ width: "100%", background: "white", borderRadius: "5px" }}
          value={privateValue}
        />
      </PrivateRooms>
    </MasterContainer>
  );
};

const MasterContainer = styled.div`
  background: var(--beige-color);
  width: 650px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  height: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 1px blue solid;
`;

const PublicRooms = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  /* gap: 20px; */
  width: 100%;
  height: 50%;
  border: 1px solid red;
`;

const PrivateRooms = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  border: 1px solid green;
`;

const Text = styled.div``;

export default ChatRooms;
