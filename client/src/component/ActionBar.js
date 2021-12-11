import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AiOutlineRetweet } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { IoShareOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";
import { PostContext } from "./PostContext";

const ActionBar = ({ postId, isLiked, isRetweeted, numLikes, numRetweets }) => {
  const { setIsUpdating, isUpdating } = useContext(PostContext);
  const [likes, setLikes] = useState(isLiked);
  const [likesNum, setLikesNum] = useState(numLikes);
  const [reposts, setRepost] = useState(false);
  const [repostsNum, setRepostsNum] = useState(0);
  // const [heartColor, setHeartColor] = useState("");
  // const [errorStatus, setErrorStatus] = useState(false);
  // console.log(numLikes);
  // console.log(isLiked);

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
          setLikes(!likes);
          setIsUpdating(true);
        }
        // console.log("The likes", data);
      })
      .catch((err) => {
        // setErrorStatus(true);
        console.log(err);
      });
  };

  useEffect(() => {
    if (likes) {
      setLikesNum(1);
      // setHeartColor("red");
    } else if (!likes) {
      setLikesNum(0);
      // setHeartColor("none");
    }
  }, [likes]);

  const handleClickRepost = (ev) => {
    ev.stopPropagation();
    setRepost(!reposts);
  };

  useEffect(() => {
    if (reposts) {
      setRepostsNum(1);
    } else if (!reposts) {
      setRepostsNum(0);
    }
  }, [reposts]);

  // if (errorStatus) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         fontSize: "20px",
  //         alignContent: "center",
  //       }}
  //     >
  //       You broke the cat... <FaCat /> Please refresh the page and try again{" "}
  //       <GiWizardFace />{" "}
  //     </div>
  //   );
  // }

  return (
    <Master>
      <div>
        <UnstyledActionButton>
          <BiMessageRounded />
        </UnstyledActionButton>
      </div>
      <Repost
      // onClick={(ev) => {
      //   handleClickRepost(ev);
      // }}
      >
        <UnstyledActionButton>
          <RepostIcon
            onClick={(ev) => {
              handleClickRepost(ev);
            }}
          >
            {reposts ? (
              <AiOutlineRetweet style={repostStyleActive} />
            ) : (
              <AiOutlineRetweet />
            )}
          </RepostIcon>
        </UnstyledActionButton>
        <div>{repostsNum}</div>
      </Repost>
      <Heart
        onClick={(ev) => {
          handleClickLike(ev);
        }}
      >
        <UnstyledActionButton>
          <LittleHeart>
            {likes ? <FiHeart style={heartStyleActive} /> : <FiHeart />}
          </LittleHeart>
          {/* <Background /> */}
        </UnstyledActionButton>
        <div>{likesNum}</div>
      </Heart>
      <div>
        <UnstyledActionButton>
          <IoShareOutline />
        </UnstyledActionButton>
      </div>
    </Master>
  );
};

const Master = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 60px;
  gap: 110px;
  align-items: center;
  margin-top: 10px;
`;

const Heart = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const LittleHeart = styled.div`
  z-index: 10;
  &:active {
    color: red;
  }
`;
// const Background = styled.div`
//   border-radius: 50%;
//   width: 50px;
//   background: pink;
//   z-index: -1;
// `;
const heartStyleActive = {
  fill: "red",
  color: "red",
};

const Repost = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const RepostIcon = styled.div`
  &:active {
    color: green;
  }
`;
const repostStyleActive = {
  // fill: "red",
  color: "green",
};

const UnstyledActionButton = styled.button`
  background: transparent;
  border: none;
  color: black;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 20px;
  transition: all 300ms ease-out;
  &&:active {
    transform: scale(0.8);
  }
`;

export default ActionBar;
