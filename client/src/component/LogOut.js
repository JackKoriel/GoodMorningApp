import React from "react";
import { ImSad } from "react-icons/im";
import styled from "styled-components";
import { useHistory } from "react-router";

const LogOut = () => {
  let history = useHistory();

  const handleClickNo = () => {
    history.push("/");
  };

  const handleClickYes = () => {
    fetch(`/api/logout`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        history.push("/signup");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Master>
      <MessageDiv>
        <Text>
          <h1>
            Are you sure you want to logout? <ImSad />
          </h1>
        </Text>
        <ButtonContainer>
          <Button onClick={handleClickYes}>Yes</Button>
          <Button onClick={handleClickNo}>No</Button>
        </ButtonContainer>
      </MessageDiv>
    </Master>
  );
};

const Master = styled.div`
  background: var(--beige-color);
  max-width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  gap: 20px;
  overflow: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--yellow-color);
  border-radius: 10px;
  margin: 20px;
  padding: 20px 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Text = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 15px 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px;
  width: 70%;
  gap: 70px;
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

export default LogOut;
