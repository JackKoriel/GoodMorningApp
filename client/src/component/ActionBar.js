import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { AiOutlineRetweet } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";
import { PostContext } from "./PostContext";

const ActionBar = ({ postId, isLiked, isShared, numLikes, numShares }) => {
  const { setIsUpdating, isUpdating } = useContext(PostContext);
  const [likes, setLikes] = useState(isLiked);
  const [likesNum, setLikesNum] = useState(numLikes);
  const [shared, setShared] = useState(isShared);
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
          setShared(!shared);
          setIsUpdating(true);
        }
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

  // useEffect(() => {
  //   if (reposts) {
  //     setRepostsNum(1);
  //   } else if (!reposts) {
  //     setRepostsNum(0);
  //   }
  // }, [reposts]);

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
            {shared ? (
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
  fill: "white",
  color: "black",
};

const shareStyleInactive = {
  fill: "green",
  color: "black",
};

export default ActionBar;
