import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import PostBox from "./PostBox";
import PostModal from "./PostModal";
import { currentUserContext } from "./CurrentUserContext";
import { PostContext } from "./PostContext";
import ActionBar from "./ActionBar";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";

const HomeFeed = () => {
  let history = useHistory();
  const {
    user: { status, avatarSrc, handle },
  } = useContext(currentUserContext);
  console.log("user handle", handle);

  const {
    posts: { data },
  } = useContext(PostContext);
  // console.log("posts object", posts);

  const [modalStatus, setModalStatus] = useState(false);

  const handleClickProfile = (ev, handleProfile) => {
    history.push(`/${handleProfile}`);
    ev.stopPropagation();
    // console.log("Profile:", handleProfile);
  };
  const handleClickTweet = (ev, _id) => {
    history.push(`/post/${_id}`);
    // console.log("hello");
  };
  // let postsArray;
  // useEffect(() => {
  //   postsArray = Object.values(posts);
  // }, [posts.status]);

  // console.log("the array", postsArray);
  console.log("home feed data", data);
  return (
    <>
      {status === "idle" ? (
        <Progress>
          <CircularProgress /> Loading...
        </Progress>
      ) : (
        <MasterContainer>
          <Header>
            <TitleHome>Home</TitleHome>
            <PostBox setModalStatus={setModalStatus} avatarSrc={avatarSrc} />
          </Header>
          <PostModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          />
          <div>
            {data !== undefined &&
              data.map((post) => {
                // console.log("post after map", data);
                let handleProfile = post.author.handle;
                // console.log(handleProfile);
                // const date = tweet.timestamp;
                // console.log(tweet);
                return (
                  // <div>{handleProfile}</div>
                  <APost
                    tabIndex="0"
                    key={post._id}
                    onClick={(ev) => {
                      handleClickTweet(ev, post._id);
                    }}
                  >
                    <div>
                      <TopLine>
                        <Img src={post.author.avatarSrc} alt="profile" />
                        <Status>
                          <NameHandl
                            onClick={(ev) => {
                              handleClickProfile(ev, handleProfile);
                              // console.log(handleProfile);
                            }}
                          >
                            {post.author.displayName}{" "}
                            <Span>
                              @{post.author.handle} ·{" "}
                              {moment(post.timestamp).format(" MMM Do")}
                            </Span>
                          </NameHandl>
                          <TweetStatus>{post.status}</TweetStatus>
                        </Status>
                      </TopLine>
                    </div>
                    {post.media?.map((src, index) => {
                      return (
                        <ImgBig key={index} src={src.url} alt="postImage" />
                      );
                    })}
                    <ActionBar
                      tweetId={post._id}
                      isLiked={post.isLiked}
                      isRetweeted={post.isRetweeted}
                      numLikes={post.numLikes}
                      numRetweets={post.numRetweets}
                    />
                  </APost>
                );
              })}
          </div>
        </MasterContainer>
      )}
    </>
  );
};

const MasterContainer = styled.div`
  flex: 0.5;
  border-right: 1px solid var(--morning-background);
  min-width: fit-content;
  overflow-y: scroll;
  height: auto;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  /* position: sticky; */
  top: 0;
  background-color: white;
  z-index: 100;
  border: 1px solid var(--morning-background);
  padding: 10px 20px;
`;
const TitleHome = styled.h2`
  margin-left: 20px;
  margin-bottom: 20px;
`;
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

const Img = styled.img`
  border-radius: 50px;
  width: 50px;
  height: auto;
`;
const ImgBig = styled.img`
  border-radius: 3px;
  /* width: 500px; */
  max-width: 70%;
  height: auto;
  margin-left: 60px;
`;
const Master = styled.div`
  /* border: 1px solid pink; */
  max-width: 100vw;
`;

const TopLine = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-top: 20px;
  line-height: 25px;
`;

const APost = styled.div`
  /* display: flex; */
  margin-bottom: 25px;
  border-bottom: 1px solid var(--morning-background);
  padding-bottom: 20px;
  padding-left: 20px;
  /* text-align: wrap; */
  /* max-width: 600px; */
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    background: var(--morning-background);
    border-radius: 20px;
    cursor: pointer;
  }
`;
const NameHandl = styled.div`
  font-weight: 700;
  width: 350px;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.05);
    background: #ffe8f1;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const Status = styled.div`
  font-weight: 700;
`;

const Span = styled.span`
  color: rgb(101, 119, 134);
  font-size: 14px;
`;

const TweetStatus = styled.p`
  font-weight: 400;
  word-break: break-all;
`;

export default HomeFeed;
