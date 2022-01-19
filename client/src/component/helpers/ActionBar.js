import React, { useState, useContext } from "react";
import styled from "styled-components";
import { FiPlusSquare } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { PostContext } from "../contexts/PostContext";
import { useHistory } from "react-router-dom";

const ActionBar = ({ postId, isLiked, sharedArray }) => {
  let history = useHistory();
  const {
    actions: { clearFeed },
    setStart,
    setIsUpdatingPost,
    isUpdatingPost,
  } = useContext(PostContext);
  const [likes, setLikes] = useState(isLiked);
  const [shared, setShared] = useState(sharedArray?.length > 0 ? true : false);

  const handleClickLike = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    fetch(`/api/post/${postId}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        like: !likes,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          //to update homefeed so it doesn't create dupes due to the infinite scroll
          clearFeed();
          setStart(0);
          //to update the like functionality
          setLikes(!likes);
          setIsUpdatingPost(!isUpdatingPost);
        }
      })
      .catch((err) => {});
  };

  const handleClickShare = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    fetch(`/api/post/${postId}/share`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        shared: !shared,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          //to update homefeed so it doesn't create dupes due to the infinite scroll
          clearFeed();
          setStart(0);
          //to update the share functionality
          setShared(sharedArray?.length > 0 ? true : false);
          setIsUpdatingPost(!isUpdatingPost);
          history.push(`/`);
          document.getElementById("HomeFeed").scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      })
      .catch((err) => {});
  };

  return (
    <Master>
      <Heart
        onClick={(ev) => {
          handleClickLike(ev);
        }}
      >
        <UnstyledActionButton>
          <LittleHeart>
            {likes ? (
              <FiHeart style={heartStyleActive} />
            ) : (
              <FiHeart style={heartStyleInactive} />
            )}
          </LittleHeart>
        </UnstyledActionButton>
      </Heart>
      <Share
        onClick={(ev) => {
          handleClickShare(ev);
        }}
      >
        <UnstyledActionButton>
          <LittleShare>
            {sharedArray?.length > 0 ? (
              <FiPlusSquare style={shareStyleActive} />
            ) : (
              <FiPlusSquare style={shareStyleInactive} />
            )}
          </LittleShare>
        </UnstyledActionButton>
      </Share>
    </Master>
  );
};

const Master = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Heart = styled.div``;
const LittleHeart = styled.div`
  z-index: 10;
  &:active {
    color: red;
  }
`;

const LittleShare = styled.div`
  z-index: 10;
  &:active {
    color: blue;
  }
`;

const heartStyleActive = {
  fill: "red",
  color: "red",
};

const heartStyleInactive = {
  fill: "white",
  color: "black",
};

const UnstyledActionButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  margin: 0;
  padding: 0;
  font-size: 25px;
  transition: all 300ms ease-out;
  &&:active {
    transform: scale(0.8);
  }
`;

const Share = styled.div``;

const shareStyleActive = {
  textShadow: "10px 10px 10px blue",
  fill: "lightblue",
  color: "black",
};

const shareStyleInactive = {
  fill: "white",
  color: "black",
};

export default ActionBar;
