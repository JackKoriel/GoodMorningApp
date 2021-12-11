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
  // console.log(tweetData.author.handle);
  // let ProfileHandle = tweetData.author.handle;
  // console.log(ProfileHandle);
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
        <div>
          <APost>
            <>
              <TopLine>
                <Status>
                  <Img src={postData.author.avatarSrc} />
                  <NameHandle
                    onClick={(ev) => {
                      let ProfileHandle = postData.author.handle;
                      handleClickProfile(ev, ProfileHandle);
                      // console.log(handleProfile);
                    }}
                  >
                    {postData.author.displayName}
                    <Span>@{postData.author.handle}</Span>
                  </NameHandle>
                </Status>
                <TweetStatus>{postData.status}</TweetStatus>
              </TopLine>
            </>
            {postData.media !== undefined && (
              <ImgBig src={postData.media[0]?.url} />
            )}
            <Time>
              {moment(postData.timestamp).format("h:mm A · MMM D YYYY")} ·{" "}
              Doodle-do web app
            </Time>
            <ActionBar
              postId={postId}
              isLiked={postData.isLiked}
              isRetweeted={postData.isRetweeted}
              numLikes={postData.numLikes}
              numRetweets={postData.numRetweets}
            />
          </APost>
        </div>
      )}
    </>
  );
};

const Span = styled.span`
  color: rgb(101, 119, 134);
  font-size: 14px;
`;

const TweetStatus = styled.p`
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 10px;
  max-width: 700px;
  word-break: break-all;
`;

const ImgBig = styled.img`
  border-radius: 10px;
  /* width: 500px; */
  max-width: 70%;
  height: auto;
  /* margin-left: 60px; */
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

const TopLine = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* align-items: center; */
  justify-content: flex-start;
  margin-bottom: 10px;
  margin-top: 20px;
  line-height: 20px;
`;
const NameHandle = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  transition: all 400ms ease-in-out;
  &:hover {
    transform: scale(1.2);
    background: #ffe8f1;
    border-radius: 10px;
    cursor: pointer;
  }
`;

const APost = styled.div`
  /* display: flex; */
  margin-bottom: 25px;
  border-bottom: 1px solid var(--twitter-background);
  padding-bottom: 20px;
  padding-left: 20px;
  /* text-align: wrap; */
  /* max-width: 600px; */
`;

const Status = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  align-items: center;
  word-break: break-word;
`;

const Time = styled.div`
  color: #625b55;
  font-weight: 700;
  margin-top: 20px;
  /* margin-bottom: 10px; */
`;
export default PostDetails;
