import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TextareaAutosize } from "@material-ui/core";
import Axios from "axios";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";

const PostModal = ({ modalStatus, setModalStatus }) => {
  //status states
  const [statusUpdate, setStatusUpdate] = useState("");
  const [statusValue, setStatusValue] = useState("");

  //images states
  const [previewSource, setPreviewSource] = useState("");
  const [imageSelected, setImageSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // const { setIsUpdating, isUpdating } = useContext(TweetContext);
  // const [postStatusError, setPostStatusError] = useState(false);

  const [counter, setCounter] = useState(280);
  const [counterColor, setCounterColor] = useState("");
  const [buttonState, setButtonState] = useState();

  //change counter color for the status update
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

  //when user selects and image fromt their machine
  const handleImageChange = (event) => {
    setImageSelected(event.target.files[0]);
    setInputValue(event.target.value);
    if (event.target.files[0]) {
      previewFile(event.target.files[0]);
    } else {
      setPreviewSource("");
    }
  };
  //to preview the image after handleImageChange
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  //the changes in the status
  const handleStatusChange = (event) => {
    // console.log(event.target.value);
    setStatusValue(event.target.value);
    setStatusUpdate(event.target.value);
    setCounter(280 - event.target.value.length);
    // event.preventDefault();
  };

  //to close the modal
  const closeModalHandle = (ev) => {
    ev.preventDefault();
    setModalStatus(false);
  };

  const handleSubmitPost = (ev) => {
    //prevent page from refresh
    ev.preventDefault();

    //use form data to use with axios
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ow8yfkvb");
    //use Axios to send the image to cloudinary
    Axios.post(
      "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",
      formData
    ).then((res) => {
      // console.log("files from couldinary ", res);
      //send image url with status to backend
      fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          status: statusUpdate,
          imageURL: res.data.url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("The data posted", data);
          // setIsUpdating(true);
          setStatusValue("");
          setInputValue("");
        })
        .catch((err) => {
          // setPostStatusError(true);
          console.log(err);
        });
      setCounter(280);
      setModalStatus(false);
    });
  };
  return (
    <Box isOpen={modalStatus}>
      <Form>
        <PostInput>
          <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            // multiline
            placeholder="What's up!!!"
            value={statusValue}
            onChange={handleStatusChange}
            style={inputField}
          />
        </PostInput>
        <ImageUploadContainer>
          <ImageInput
            type="file"
            value={inputValue}
            name="file"
            accept="image/*"
            placeholder="Upload image"
            onChange={(event) => {
              handleImageChange(event);
            }}
          />
          {previewSource && (
            <ImageView
              src={previewSource}
              alt="chosen"
              style={{ height: "300px" }}
            />
          )}
        </ImageUploadContainer>
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
  z-index: 3;
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
  background-color: var(--blue-color);
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
  border: none;
  background: none;
  font-size: 20px;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageInput = styled.input`
  width: 100%;
  border-radius: 5px;
`;

const ImageView = styled.img`
  width: 50px;
  height: auto;
`;

export default PostModal;
