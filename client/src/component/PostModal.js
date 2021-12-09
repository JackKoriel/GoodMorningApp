import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TextareaAutosize } from "@material-ui/core";
// import { TweetContext } from "./Tweet";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";
import ImageUpload from "./ImageUpload";

const PostModal = ({ modalStatus, setModalStatus }) => {
  const [statusUpdate, setStatusUpdate] = useState("");
  const [value, setValue] = useState("");
  // const { setIsUpdating, isUpdating } = useContext(TweetContext);
  // const [postStatusError, setPostStatusError] = useState(false);

  const [counter, setCounter] = useState(280);
  const [counterColor, setCounterColor] = useState("");
  const [buttonState, setButtonState] = useState();

  useEffect(() => {
    if (counter > 50) {
      setCounterColor("#CACACA");
      setButtonState(false);
    }
    if (counter <= 50) {
      setCounterColor("#FFBA00");
      setButtonState(false);
    }
    if (counter <= 0 || counter === 280) {
      setButtonState(true);
      if (counter <= 0) {
        setCounterColor("#D40320");
      }
    }
  }, [counter]);

  const handleChange = (event) => {
    // console.log(event.target.value);
    setValue(event.target.value);
    setStatusUpdate(event.target.value);
    setCounter(280 - event.target.value.length);
    // event.preventDefault();
  };

  const closeModalHandle = (ev) => {
    ev.preventDefault();
    setModalStatus(false);
  };

  const handleSubmitPost = (ev) => {
    ev.preventDefault();

    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: statusUpdate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("The data posted", data);
        // setIsUpdating(true);
        setValue("");
        // console.log(data.tweet);
      })
      .catch((err) => {
        // setPostStatusError(true);
        console.log(err);
      });
    // setValue("");
    setCounter(280);
    setModalStatus(false);
  };
  return (
    <Box isOpen={modalStatus}>
      <Form>
        <PostInput>
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            multiline
            placeholder="What's up!!!"
            value={value}
            onChange={handleChange}
            style={inputField}
          />
        </PostInput>
        <ImageUpload />
        <ButtonContainer>
          <Counter counterColor={counterColor}>{counter}</Counter>
          <Button
            disabled={buttonState}
            type="submit"
            onClick={(ev) => {
              handleSubmitPost(ev);
            }}
          >
            {/* {isUpdating ? <i className="fa fa-spinner fa-spin" /> : "Mewo"} */}
            POST
          </Button>
          <ButtonClose
            onClick={(ev) => {
              closeModalHandle(ev);
            }}
          >
            X
          </ButtonClose>
        </ButtonContainer>
      </Form>
    </Box>
  );
};

const Box = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: ${({ isOpen }) => {
    return isOpen ? "visible" : "hidden";
  }};
  opacity: ${({ isOpen }) => {
    return isOpen ? 1 : 0;
  }};
  /* transition: visibility 0s, opacity 0.5s; */

  /* &&:active {
    visibility: visible;
    opacity: 1;
  } */
`;

const Form = styled.form`
  position: relative;
  background-color: white;
  border-radius: 10px;
  height: 40%;
  min-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PostInput = styled.div``;

const inputField = {};

const ButtonContainer = styled.div``;

const Counter = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ counterColor }) => {
    return counterColor;
  }};
`;

const Button = styled.button`
  padding: 10px 16px;
  width: 80px;
  margin-bottom: 10px;
  color: white;
  border: none;
  border-radius: 30px;
  background-color: var(--primary);
  margin-left: 0;
  margin-top: 20px;
  font-weight: 700;
  transition: all 300ms ease-out;
  font-size: 15px;
  &&:active {
    transform: scale(0.8);
  }
  background-color: ${({ disabled }) => {
    return disabled && "gray";
  }};
  cursor: ${({ disabled }) => {
    return disabled && "no-drop";
  }};
`;

const ButtonClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: 700;
`;

export default PostModal;
