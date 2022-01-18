import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import styled from "styled-components";
import ActionBar from "../helpers/ActionBar";
import { FiXCircle } from "react-icons/fi";
import { PostContext } from "../contexts/PostContext";

const FeedRendering = ({ handle, name, userHandle, currentUser, friend }) => {
  let history = useHistory();
  const { setIsUpdatingPost, isUpdatingPost } = useContext(PostContext);
  const [posts, setPosts] = useState();
  const [postStatus, setPostStatus] = useState(false);

  //get user's posts
  useEffect(() => {
    fetch(`/api/${handle}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setPostStatus(true);
      })
      .catch((err) => {});
  }, [handle, isUpdatingPost]);

  const handleClickProfile = (ev, handleProfile) => {
    history.push(`/${handleProfile}`);
    ev.stopPropagation();
  };

  const handleSharedClick = (ev, shareId) => {
    ev.stopPropagation();
    history.push(`/post/${shareId}`);
  };

  const handleClickPost = (ev, _id) => {
    history.push(`/post/${_id}`);
  };

  // delete user's posts
  const handleRemove = (ev, _id, originId) => {
    ev.preventDefault();
    ev.stopPropagation();

    fetch(`/api/post/${_id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        originId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsUpdatingPost(!isUpdatingPost);
      })
      .catch((err) => {});
  };

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
                    {post.media?.map((src, index) =>
                      src.url ? (
                        <ImgBig key={index} src={src.url} alt="postImage" />
                      ) : null
                    )}
                    <ActionBar
                      tweetId={post._id}
                      isLiked={post.isLiked}
                      isShared={post.isShared}
                      numLikes={post.numLikes}
                      numShares={post.numShares}
                      sharedArray={post.sharedBy}
                    />
                  </ImageBigContainer>
                  <Status>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <NameHandl
                        onClick={(ev) => {
                          handleClickProfile(ev, handleProfile);
                        }}
                      >
                        {name}
                      </NameHandl>
                      {post.reshareOf && (
                        <SharedFrom
                          onClick={(ev) => {
                            handleSharedClick(ev, post.reshareOf);
                          }}
                        >
                          {" "}
                          shared a post by @{post.originalAuthor}
                        </SharedFrom>
                      )}
                    </div>
                    <PostStatus>{post.status}</PostStatus>
                    {post.reshareOf ? (
                      <Span>
                        @{post.originalAuthor} ·{" "}
                        {moment(post.originalTimeStamp).format(" MMM Do")}
                      </Span>
                    ) : (
                      <Span>
                        @{userHandle} ·{" "}
                        {moment(post.timestamp).format(" MMM Do")}
                      </Span>
                    )}
                  </Status>
                  {friend === currentUser && (
                    <ButtonRemove
                      onClick={(ev) => {
                        handleRemove(ev, post._id, post.reshareOf);
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
  margin-top: 200px;
`;

const APost = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--yellow-color);
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  gap: 20px;
  margin: 15px;
  padding: 0 5px;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    background: var(--yellow-color);
    border-radius: 20px;
    cursor: pointer;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 0px;
  }
`;
const ImageBigContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-right: 15px;
`;
const Img = styled.img`
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
    padding-left: 5px;
  }
`;
const SharedFrom = styled.div`
  font-weight: 700;
  color: rgb(101, 119, 134);
  font-size: 14px;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.05);
    background: var(--gold-color);
    border-radius: 10px;
    cursor: pointer;
    padding-left: 5px;
  }
`;

const Status = styled.div`
  margin: 15px 0;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media screen and (max-width: 700px) {
    margin: 15px;
  }
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
