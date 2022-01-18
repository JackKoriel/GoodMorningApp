import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import styled from "styled-components";
import ActionBar from "../helpers/ActionBar";

const PostDetails = () => {
  let history = useHistory();
  const { postId } = useParams();
  const [status, setStatus] = useState(false);
  const [postData, setPostData] = useState({});
  const [authorData, setAuthorData] = useState({});

  //fetch posts by id
  useEffect(() => {
    fetch(`/api/post/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.data);
        fetch(`/api/user/${data.data.author._id}`)
          .then((res) => res.json())
          .then((author) => {
            setAuthorData(author.data);
            setStatus(true);
          });
      })
      .catch((err) => {});
  }, [postId]);

  const handleClickProfile = (ev, ProfileHandle) => {
    history.push(`/${ProfileHandle}`);
    ev.stopPropagation();
  };

  const handleSharedClick = (ev, shareId) => {
    ev.stopPropagation();
    history.push(`/post/${shareId}`);
  };

  return (
    <>
      {!status ? (
        <Progress>
          <CircularProgress /> Loading...
        </Progress>
      ) : (
        <APost>
          <PostObj>
            <ImageBigContainer>
              <Img src={authorData.avatarSrc} alt="profile" />
              {postData.media !== undefined && (
                <ImgBig src={postData.media[0]?.url} />
              )}
              <ActionBar
                postId={postData._id}
                isLiked={postData.isLiked}
                isShared={postData.isShared}
                numLikes={postData.numLikes}
                numShares={postData.numShares}
              />
            </ImageBigContainer>
            <Status>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <NameHandl
                  onClick={(ev) => {
                    let ProfileHandle = authorData.handle;
                    handleClickProfile(ev, ProfileHandle);
                  }}
                >
                  {authorData.displayName}
                </NameHandl>
                {postData.reshareOf && (
                  <SharedFrom
                    onClick={(ev) => {
                      handleSharedClick(ev, postData.reshareOf);
                    }}
                  >
                    {" "}
                    shared a post by @{postData.originalAuthor}
                  </SharedFrom>
                )}
              </div>
              <PostStatus>{postData.status}</PostStatus>
              {postData.reshareOf ? (
                <Span>
                  @{postData.originalAuthor} ·{" "}
                  {moment(postData.originalTimeStamp).format(" MMM Do")}
                </Span>
              ) : (
                <Span>
                  @{authorData.handle} ·{" "}
                  {moment(postData.timestamp).format(" MMM Do")}
                </Span>
              )}
            </Status>
          </PostObj>
          <Time style={{ paddingLeft: "15px" }}>
            {moment(postData.timestamp).format("h:mm A · MMM D YYYY")} · Good
            Morning web app
          </Time>
        </APost>
      )}
    </>
  );
};

const Progress = styled.div`
  background-color: var(--beige-color);
  width: 700px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  /* margin-top: 200px; */
`;
const PostObj = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const APost = styled.div`
  max-width: 700px;
  width: 650px;
  background: var(--beige-color);
  height: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--yellow-color);
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 5px 10px;
  padding: 10px 5px;
  transition: all 300ms ease-out;
  padding-bottom: 15px;
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
const Time = styled.div`
  color: #625b55;
  font-weight: 700;
  margin-top: 20px;
`;

export default PostDetails;
