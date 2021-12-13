import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { FiXCircle } from "react-icons/fi";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";

const FeedRendering = ({ handle, name, currentUser, friend }) => {
  let history = useHistory();

  const [posts, setPosts] = useState();
  const [postStatus, setPostStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    fetch(`/api/${handle}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setPostStatus(true);
      })
      .catch((err) => {
        setErrorStatus(true);
        // console.log(err);
      });
  }, [handle]);

  const handleClickProfile = (ev, handleProfile) => {
    history.push(`/${handleProfile}`);
    ev.stopPropagation();

    // console.log("Profile:", handleProfile);
  };

  const handleClickPost = (ev, _id) => {
    history.push(`/post/${_id}`);
    // console.log("hello");
  };

  const handleRemove = (ev, _id) => {
    ev.preventDefault();
    ev.stopPropagation();

    fetch(`/api/post/${_id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  //   if (errorStatus) {
  //     return (
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           fontSize: "20px",
  //           alignContent: "center",
  //           flexDirection: "column",
  //           alignItems: "center",
  //           marginTop: "100px",
  //           gap: "30px",
  //         }}
  //       >
  //         <div>
  //           You broke the cat... <FaCat size={60} />
  //         </div>
  //         <div>
  //           <GiWizardFace size={60} /> Please refresh the page and try again{" "}
  //           <GiWizardFace size={60} />
  //         </div>
  //       </div>
  //     );
  //   }
  // console.log("jack", posts);
  return (
    <>
      {!postStatus ? (
        <Progress>
          <CircularProgress />
        </Progress>
      ) : (
        <div>
          {posts !== undefined &&
            posts.map((post) => {
              let handleProfile = post.author.handle;
              return (
                <APost
                  tabIndex="0"
                  key={post._id}
                  onClick={(ev) => {
                    handleClickPost(ev, post._id);
                  }}
                >
                  <ImageBigContainer>
                    <Img src={post.author.avatarSrc} alt="profile" />
                    {post.media?.map((src, index) => {
                      return (
                        <ImgBig key={index} src={src.url} alt="postImage" />
                      );
                    })}
                    <ActionBar
                      tweetId={post._id}
                      isLiked={post.isLiked}
                      isShared={post.isShared}
                      numLikes={post.numLikes}
                      numShares={post.numShares}
                    />
                  </ImageBigContainer>

                  <Status>
                    <NameHandl
                      onClick={(ev) => {
                        handleClickProfile(ev, handleProfile);
                        // console.log(handleProfile);
                      }}
                    >
                      {post.author.displayName}
                    </NameHandl>
                    <PostStatus>{post.status}</PostStatus>
                    <Span>
                      @{post.author.handle} ·{" "}
                      {moment(post.timestamp).format(" MMM Do")}
                    </Span>
                  </Status>
                  {friend === currentUser && (
                    <ButtonRemove
                      onClick={(ev) => {
                        handleRemove(ev, post._id);
                      }}
                    >
                      <FiXCircle
                        onMouseOver={({ target }) =>
                          (target.style.fill = "var(--blue-color)")
                        }
                        style={{ fill: "white" }}
                        onMouseOut={({ target }) =>
                          (target.style.fill = "white")
                        }
                      />
                    </ButtonRemove>
                  )}
                </APost>
              );
            })}
        </div>
      )}
    </>
  );
};

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  /* width: 100%; */
  margin-top: 200px;
  /* margin-left: 200px; */
`;

const APost = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--yellow-color);
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  gap: 20px;
  /* align-items: center; */
  margin: 15px;
  padding: 0 5px;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    background: var(--yellow-color);
    border-radius: 20px;
    cursor: pointer;
  }
`;
const ImageBigContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-right: 15px;
`;
const Img = styled.img`
  /* position: relative; */
  /* left: 20px;
  top: 25px; */
  border-radius: 50px;
  border: 3px solid white;
  width: 50px;
  height: auto;
  margin: 0;
  z-index: 10;
`;
const ImgBig = styled.img`
  position: relative;
  top: -30px;
  left: 5px;
  border-radius: 10px;
  max-width: 300px;
  height: auto;
`;

const NameHandl = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 700;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.05);
    background: var(--gold-color);
    border-radius: 10px;
    cursor: pointer;
  }
`;

const Status = styled.div`
  margin: 15px 0;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Span = styled.span`
  color: rgb(101, 119, 134);
  font-size: 14px;
`;

const PostStatus = styled.p`
  font-weight: 400;
  word-break: break-word;
`;

const ButtonRemove = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background: none;
  font-size: 30px;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
    fill: red;
  }
`;
export default FeedRendering;
