import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { currentUserContext } from "../contexts/CurrentUserContext";
import { useHistory } from "react-router";

const PostBox = () => {
  let history = useHistory();
  const {
    user: { avatarSrc, handle, _id },
    update,
    setUpdate,
  } = useContext(currentUserContext);
  const [userBio, setUserBio] = useState("");
  const [moodButtonStatus, setMoodButtonStatus] = useState(true);
  let placeholderText = `How is your mood ${handle}?`;

  const handleChangeUserBio = (ev) => {
    setUserBio(ev.target.value);
  };

  const handleClickUserBio = (ev) => {
    ev.preventDefault();
    setMoodButtonStatus(false);
    fetch(`/api/profile/${_id}`, {
      method: "POST",
      body: JSON.stringify({
        bio: userBio,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((resP) => resP.json())
      .then((jsonP) => {
        if (jsonP.status === 200) {
          history.push(`/${handle}`);
          setMoodButtonStatus(true);
          setUserBio("");
          setUpdate(!update);
        }
      });
  };

  return (
    <MasterContainer>
      <Form>
        <AvatarContainer>
          <Avatar src={avatarSrc} />
          <Input
            placeholder={placeholderText}
            type="text"
            onChange={(ev) => handleChangeUserBio(ev)}
            value={userBio}
            rows="2"
            cols="10"
          />
        </AvatarContainer>
        <Button type="submit" onClick={(ev) => handleClickUserBio(ev)}>
          {!moodButtonStatus ? (
            <i className="fas fa-ring fa-spin" />
          ) : (
            "Mood-on!"
          )}
        </Button>
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

const Input = styled.textarea`
  width: 100%;
  border: none;
  border-radius: 30px;
  padding-left: 10px;
  padding-top: 5px;
  word-break: break-word;
  @media screen and (max-width: 820px) {
    height: fit-content;
    width: 100%;
    padding: 5px;
    margin-left: 10px;
    height: 40px;
  }
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  /* border: 1px solid green; */
  width: 100%;
  @media screen and (max-width: 820px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
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
  @media screen and (max-width: 820px) {
    margin-top: 20px;
    font-size: 13px;
    max-width: 80px;
    max-height: 80px;
    padding: 10px 20px;
    line-height: 10px;
  }
`;
export default PostBox;
