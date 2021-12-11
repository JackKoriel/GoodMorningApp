import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import styled from "styled-components";
import ActionBar from "./ActionBar";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";
import { AiOutlineRetweet } from "react-icons/ai";

const FeedRendering = ({ handle, name }) => {
  let history = useHistory();

  const [posts, setPosts] = useState();
  //   const [tweetsId, setTweetsId] = useState();
  const [postStatus, setPostStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  // console.log("posts", posts);

  // const {
  //   state: { statusTweet, tweetsById, tweetId },
  //   errorStatus,
  // } = useContext(TweetContext);

  useEffect(() => {
    fetch(`/api/${handle}/feed`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        // setTweetsId(data.tweetIds);
        // console.log("posts data", data);
        setPostStatus(true);
      })
      .catch((err) => {
        setErrorStatus(true);
        // console.log(err);
      });
  }, []);

  const handleClickProfile = (ev, handleProfile) => {
    history.push(`/${handleProfile}`);
    ev.stopPropagation();
    // console.log("Profile:", handleProfile);
  };

  const handleClickPost = (ev, _id) => {
    history.push(`/post/${_id}`);
    // console.log("hello");
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
              // console.log("one post", post);
              let handleProfile = post.author.handle;
              //   console.log(handleProfile);
              //   const date = tweet.timestamp;
              //   console.log(tweet);
              return (
                <APost
                  key={post._id}
                  onClick={(ev) => {
                    handleClickPost(ev, post._id);
                  }}
                >
                  <div>
                    <UpperLine>
                      {post.isRetweeted && (
                        <Posted>
                          <AiOutlineRetweet /> <Span>{name} Redoodled</Span>
                        </Posted>
                      )}
                      <TopLine>
                        <Img src={post.author.avatarSrc} alt="profile" />
                        <Status>
                          <div
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
                          </div>
                          <PostStatus>{post.status}</PostStatus>
                        </Status>
                      </TopLine>
                    </UpperLine>
                  </div>
                  {post.media?.map((src, index) => {
                    return <ImgBig key={index} src={src.url} alt="postImage" />;
                  })}
                  <ActionBar
                    postId={post._id}
                    isLiked={post.isLiked}
                    isRetweeted={post.isRetweeted}
                    numLikes={post.numLikes}
                    numRetweets={post.numRetweets}
                  />
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
const UpperLine = styled.div`
  display: flex;
  flex-direction: column;
`;

const Posted = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 14px;
  margin-bottom: -10px;
`;

const Img = styled.img`
  border-radius: 50px;
  width: 50px;
  height: auto;
`;
const ImgBig = styled.img`
  border-radius: 10px;
  /* width: 500px; */
  max-width: 70%;
  height: auto;
  margin-left: 60px;
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

const Status = styled.div`
  font-weight: 700;
`;

const Span = styled.span`
  color: rgb(101, 119, 134);
  font-size: 14px;
`;

const PostStatus = styled.div`
  font-weight: 400;
  color: #000000;
`;

export default FeedRendering;
