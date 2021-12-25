import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Gaming = () => {
  let history = useHistory();
  const roomId = "publicRoom_gaming";
  //start converstation in the room
  const handleRoomClick = () => {
    history.push(`/chat/${roomId}`);
  };

  return (
    <Card onClick={handleRoomClick}>
      <Background src="https://res.cloudinary.com/dhj5ncbxs/image/upload/v1640453365/samples/Public%20rooms/acastro_210113_1777_gamingstock_0002_ai4yvr.jpg" />
      <Filter>
        <Text>Cool Gamers</Text>
      </Filter>
    </Card>
  );
};

const Card = styled.button`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease-out;
  border-radius: 5px;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 5px 5px;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);

    cursor: pointer;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  background-color: rgb(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  border-radius: 5px;
  z-index: 2;
`;

const Background = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.9;
  border-radius: 5px;
`;

const Text = styled.div`
  font-size: 20px;
  margin-top: 40%;
  font-weight: 900;
  padding: 0 10px;
  line-height: 1.5;
  color: white;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;
export default Gaming;
