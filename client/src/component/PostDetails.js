import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import styled from "styled-components";
import ActionBar from "./ActionBar";
import { FaCat } from "react-icons/fa";
import { GiWizardFace } from "react-icons/gi";

const PostDetails = () => {
  let history = useHistory();
  const { postId } = useParams();
  const [status, setStatus] = useState(false);
  const [postData, setPostData] = useState({});
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    fetch(`/api/post/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch data", data);
        setPostData(data.data);
        setStatus(true);
      })
      .catch((err) => {
        setErrorStatus(true);
        console.log(err);
      });
  }, []);

  const handleClickProfile = (ev, ProfileHandle) => {
    history.push(`/${ProfileHandle}`);
    ev.stopPropagation();
    // console.log("Profile:", handleProfile);
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
  console.log("postData", postData);
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
              <Img src={postData.author.avatarSrc} alt="profile" />
              {postData.media !== undefined && (
                <ImgBig src={postData.media[0]?.url} />
              )}
              <ActionBar
                postId={postData._id}
                isLiked={postData.isLiked}
                isRetweeted={postData.isRetweeted}
                numLikes={postData.numLikes}
                numRetweets={postData.numRetweets}
              />
            </ImageBigContainer>
            <Status>
              <NameHandl
                onClick={(ev) => {
                  let ProfileHandle = postData.author.handle;
                  handleClickProfile(ev, ProfileHandle);
                  // console.log(handleProfile);
                }}
              >
                {postData.author.displayName}
              </NameHandl>
              <PostStatus>{postData.status}</PostStatus>
              <Span>
                @{postData.author.handle} ·{" "}
                {moment(postData.timestamp).format(" MMM Do")}
              </Span>
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
const PostObj = styled.div`
  display: flex;
  flex-direction: row;
`;

const APost = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--yellow-color);
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 15px;
  padding: 0 5px;
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
const Time = styled.div`
  color: #625b55;
  font-weight: 700;
  margin-top: 20px;
  /* margin-bottom: 10px; */
`;

export default PostDetails;
