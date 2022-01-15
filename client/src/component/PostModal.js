import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { TextareaAutosize } from "@material-ui/core";
import Axios from "axios";
import { FiXCircle } from "react-icons/fi";
import { PostContext } from "./PostContext";

const PostModal = ({ modalStatus, setModalStatus }) => {
  const {
    actions: { clearFeed },
    setStart,
    setIsUpdatingPost,
    isUpdatingPost,
  } = useContext(PostContext);

  //status states
  const [statusUpdate, setStatusUpdate] = useState("");
  const [statusValue, setStatusValue] = useState("");

  //images states
  const [previewSource, setPreviewSource] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [imageURL, setImageURL] = useState("");
  // const [postStatusError, setPostStatusError] = useState(false);

  const [counter, setCounter] = useState(280);
  const [counterColor, setCounterColor] = useState("");
  const [buttonState, setButtonState] = useState();
  const [buttonStateImage, setButtonStateImage] = useState(true);
  const [buttonStatePost, setButtonStatePost] = useState(true);

  //change counter color for the status update
  useEffect(() => {
    if (counter > 50) {
      setCounterColor("var(--blue-color)");
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
    setInputValue(event.target.value);
    if (event.target.files[0]) {
      previewFile(event.target.files[0]);
    } else {
      setPreviewSource("");
    }
    //use form data to use with axios
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "ow8yfkvb");
    //use Axios to send the image to cloudinary

    if (event.target.files[0] !== undefined) {
      //set the button state so the user doesn't submit before the URL is returned
      setButtonStateImage(false);
      Axios.post(
        "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",
        formData
      ).then((res) => {
        setImageURL(res.data.url);
        setButtonStateImage(true);
      });
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
    setStatusValue(event.target.value);
    setStatusUpdate(event.target.value);
    setCounter(280 - event.target.value.length);
    // event.preventDefault();
  };

  //to close the modal
  const closeModalHandle = (ev) => {
    ev.preventDefault();
    setModalStatus(false);
    setStatusValue("");
    setInputValue("");
    setPreviewSource("");
  };

  const handleSubmitPost = (ev) => {
    //set button state for the loading animations on the button
    setButtonStatePost(false);
    //prevent page from refresh
    ev.preventDefault();
    //send image url with status to backend
    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        status: statusUpdate,
        imageURL: imageURL,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatusValue("");
        setInputValue("");
        setPreviewSource("");
        setImageURL("");
        clearFeed();
        setStart(0);
        setIsUpdatingPost(!isUpdatingPost);
        setButtonStatePost(true);
      })
      .catch((err) => {});
    setCounter(280);
    setModalStatus(false);
  };
  return (
    <Box isOpen={modalStatus}>
      <Form>
        <PostInput>
          <TextareaAutosize
            id="outlined-multiline-static"
            label="Multiline"
            // multiline
            minRows={4}
            maxRows={4}
            placeholder="What's up!!!"
            value={statusValue}
            onChange={handleStatusChange}
            style={inputField}
          />
        </PostInput>
        <ImageUploadContainer>
          <ImageInput>
            <label htmlFor="file-upload-image" style={lableStyle}>
              {inputValue ? inputValue : "Choose an image"}
            </label>
            <input
              style={{ display: "none" }}
              id="file-upload-image"
              type="file"
              value={inputValue}
              name="file"
              accept="image/*"
              placeholder="Upload image"
              onChange={(event) => {
                handleImageChange(event);
              }}
            />
          </ImageInput>
        </ImageUploadContainer>
        <ButtonContainer>
          <Counter counterColor={counterColor}>{counter}</Counter>
          <Button
            disabled={buttonState || !buttonStateImage}
            type="submit"
            onClick={(ev) => {
              handleSubmitPost(ev);
            }}
          >
            {!buttonStateImage || !buttonStatePost ? (
              <i className="fas fa-palette fa-spin" />
            ) : (
              "POST"
            )}
          </Button>
        </ButtonContainer>
        {previewSource && (
          <ImageView
            src={previewSource}
            alt="chosen"
            style={{ height: "300px" }}
          />
        )}
        <ButtonRemove
          onClick={(ev) => {
            closeModalHandle(ev);
          }}
        >
          <FiXCircle
            onMouseOver={({ target }) =>
              (target.style.fill = "var(--blue-color)")
            }
            onMouseOut={({ target }) => (target.style.fill = "white")}
          />
        </ButtonRemove>
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
`;

const Form = styled.form`
  position: relative;
  background-color: var(--beige-color);
  border: 3px solid var(--gold-color);
  border-radius: 10px;
  height: 50%;
  width: 40%;
  min-width: 500px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const PostInput = styled.div`
  margin-top: 30px;
  width: 50%;
  height: 20%;
`;

const inputField = {
  width: "100%",
  borderRadius: "10px",
  padding: "5px",
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 50px;
  width: 50%;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const ButtonRemove = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 30px;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
    fill: var(--blue-color);
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 10px 0;
  font-size: 15px;
  border: 1px solid lightgray;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;
const lableStyle = {
  width: "100%",
  height: "100%",
  cursor: "pointer",
  paddingLeft: "15px",
  paddingRight: "15px",
};

const ImageView = styled.img`
  width: auto;
  max-height: 150px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Counter = styled.div`
  font-size: 14px;
  font-weight: 900;
  color: ${({ counterColor }) => {
    return counterColor;
  }};
  background-color: var(--gold-color);
  border-radius: 20px;
  padding: 10px 20px;
`;

const Button = styled.button`
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
  width: 50%;
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
  background-color: ${({ disabled }) => {
    return disabled && "gray";
  }};
  cursor: ${({ disabled }) => {
    return disabled && "no-drop";
  }};
`;

export default PostModal;
