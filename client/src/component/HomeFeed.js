import React, { useContext, useRef, useCallback } from "react";
import styled from "styled-components";
// import PostBox from "./PostBox";
import PostModal from "./PostModal";
import { currentUserContext } from "./CurrentUserContext";
import { PostContext } from "./PostContext";
import ActionBar from "./ActionBar";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import SearchBar from "./SearchBar";
import { HeartSpinner } from "react-spinners-kit";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";

const HomeFeed = () => {
  let history = useHistory();
  const {
    user: { status },
  } = useContext(currentUserContext);

  const {
    posts: { data, statusPost },
    modalStatus,
    setModalStatus,
    setStart,
    loading,
    loadingError,
    hasMore,
    noPosts,
    startLoading,
    setStartLoading,
  } = useContext(PostContext);

  // for infinit scrolling
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setStart((prevNumber) => prevNumber + 5);
          setStartLoading(!startLoading);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

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

  return (
    <>
      {status === "loading" ? (
        <Progress>
          <CircularProgress /> Loading...
        </Progress>
      ) : (
        <MasterContainer id="HomeFeed">
          <SearchBar />
          <Header>
            <Video
              src="https://res.cloudinary.com/dhj5ncbxs/video/upload/ac_none/v1639268660/video-3_nfxgfx.mp4"
              autoPlay
              loop
              muted
            />
            <Text>GOOD MORNINGS START HERE</Text>
          </Header>
          <PostModal
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          />
          {statusPost === "idle" ? (
            <Progress>
              <HeartSpinner color="var(--blue-color)" /> Loading...
            </Progress>
          ) : (
            <>
              <div>
                {data !== undefined &&
                  data.map((post, index) => {
                    let handleProfile = post.author.handle;
                    if (data.length === index + 1) {
                      return (
                        <APost
                          ref={lastPostElementRef}
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
                                <ImgBig
                                  key={index}
                                  src={src.url}
                                  alt="postImage"
                                />
                              ) : null
                            )}
                            <ActionBar
                              postId={post._id}
                              isLiked={post.isLiked}
                              isShared={post.isShared}
                              numLikes={post.numLikes}
                              numShares={post.numShares}
                              sharedArray={post.sharedBy}
                            />
                          </ImageBigContainer>

                          <Status>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <NameHandl
                                onClick={(ev) => {
                                  handleClickProfile(ev, handleProfile);
                                }}
                              >
                                {post.author.displayName}
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
                                {moment(post.originalTimeStamp).format(
                                  " MMM Do"
                                )}
                              </Span>
                            ) : (
                              <Span>
                                @{post.author.handle} ·{" "}
                                {moment(post.timestamp).format(" MMM Do")}
                              </Span>
                            )}
                          </Status>
                        </APost>
                      );
                    } else {
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
                                <ImgBig
                                  key={index}
                                  src={src.url}
                                  alt="postImage"
                                />
                              ) : null
                            )}
                            <ActionBar
                              postId={post._id}
                              isLiked={post.isLiked}
                              isShared={post.isShared}
                              numLikes={post.numLikes}
                              numShares={post.numShares}
                              sharedArray={post.sharedBy}
                            />
                          </ImageBigContainer>
                          <Status>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <NameHandl
                                onClick={(ev) => {
                                  handleClickProfile(ev, handleProfile);
                                }}
                              >
                                {post.author.displayName}
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
                                {moment(post.originalTimeStamp).format(
                                  " MMM Do"
                                )}
                              </Span>
                            ) : (
                              <Span>
                                @{post.author.handle} ·{" "}
                                {moment(post.timestamp).format(" MMM Do")}
                              </Span>
                            )}
                          </Status>
                        </APost>
                      );
                    }
                  })}
              </div>
              <div>
                {loading && (
                  <Loading>
                    <HeartSpinner color="var(--blue-color)" /> Loading...
                  </Loading>
                )}
              </div>
              <div>{loadingError && "Error while loading..."}</div>
              <div>
                <NoPosts>
                  {noPosts &&
                    "No posts available, write a post or follow some friends 😺"}
                </NoPosts>
              </div>
            </>
          )}
        </MasterContainer>
      )}
    </>
  );
};

const MasterContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 0.5; */
  max-width: 700px;
  border-right: 1px solid var(--yellow-color);
  /* min-width: fit-content; */
  overflow-y: scroll;
  height: auto;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: var(--beige-color);
`;

const Header = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;

  z-index: 1;
`;

const Video = styled.video`
  /* position: relative; */
  object-fit: cover;
  width: 100%;
  height: 100%;
  /* position: fixed; */
  z-index: 2;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
`;
const Text = styled.h1`
  position: relative;
  top: -150px;
  color: white;
  font-weight: 900;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
  font-size: 35px;
  font-style: italic;
  z-index: 3;
`;

const Progress = styled.div`
  width: 700px;
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
  display: flex;
  flex-direction: row;
  border: 1px solid var(--yellow-color);
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  gap: 20px;
  /* align-items: center; */
  margin: 15px;
  /* margin-top: -15px; */
  padding: 5px 5px;
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
  z-index: 2;
`;
const ImgBig = styled.img`
  position: relative;
  top: -30px;
  left: 5px;
  border-radius: 10px;
  max-width: 300px;
  height: auto;
  z-index: 1;
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
`;

const Span = styled.span`
  color: rgb(101, 119, 134);
  font-size: 14px;
`;

const PostStatus = styled.p`
  font-weight: 400;
  word-break: break-word;
`;

const Loading = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  /* justify-content: center; */
  align-items: center;
  margin: 20px;
`;

const NoPosts = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  /* justify-content: center; */
  align-items: center;
  margin: 20px;
`;

export default HomeFeed;
