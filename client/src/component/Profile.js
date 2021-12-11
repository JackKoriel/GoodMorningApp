import React, { useContext, useState, useEffect } from "react";
import { currentUserContext } from "./CurrentUserContext";
import moment from "moment";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import FeedRendering from "./FeedRendering";
import styled from "styled-components";
// import { FaCat } from "react-icons/fa";
// import { GiWizardFace } from "react-icons/gi";

const Profile = () => {
  const { profileId } = useParams();
  const [userData, setUserData] = useState({});
  // const [location, setLocation] = useState(true);
  const [status, setStatus] = useState(false);
  const [errorStatusProfiles, setErrorStatusProfiles] = useState(false);
  const [followingText, setFollowingText] = useState(true);
  let handle = profileId;
  // console.log("handle", handle);
  // console.log(profileId);

  useEffect(() => {
    fetch(`/api/users/${handle}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        console.log("profile data", data);
        setStatus(true);
      })
      .catch((err) => {
        setErrorStatusProfiles(true);
        console.log(err);
      });
  }, []);

  const followingButtonHandle = (ev) => {
    setFollowingText(!followingText);
  };
  let followingFinalText;
  followingText
    ? (followingFinalText = "Following")
    : (followingFinalText = "Unfollowed");
  // useEffect(() => {
  //   if (!userData.hasOwnProperty("location")) {
  //     setLocation(false);
  //   }
  // }, []);
  // console.log(location);

  const { user, errorStatus } = useContext(currentUserContext);
  // console.log("state", state.handle);
  // console.log(state.userData.handle);
  console.log("userProfile", user.handle);
  console.log("userObject", user);

  let userProfile = {};
  handle === user.handle ? (userProfile = user) : (userProfile = userData);
  console.log(userProfile.handle);
  console.log(handle);
  // if (errorStatus || errorStatusProfiles) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         fontSize: "20px",
  //         alignContent: "center",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         marginTop: "100px",
  //         gap: "30px",
  //       }}
  //     >
  //       <div>
  //         You broke the cat... <FaCat size={60} />
  //       </div>
  //       <div>
  //         <GiWizardFace size={60} /> Please refresh the page and try again{" "}
  //         <GiWizardFace size={60} />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      {!status ? (
        <CircularProgress />
      ) : (
        <Master>
          {/* top container for profile pic and background */}
          <div>
            <Banner src={userProfile?.bannerSrc} />
            <Avatar src={userProfile?.avatarSrc} />
            {userProfile?.isFollowingYou && (
              <FollowButton
                followingText={followingText}
                onClick={(ev) => followingButtonHandle(ev)}
              >
                {followingFinalText}
              </FollowButton>
            )}
          </div>
          {/* usename and stuff */}
          <TextSection>
            <NameSection>
              <Name>{userProfile?.displayName}</Name>
              <UnderName>
                <Handle>@{userProfile?.handle} </Handle>
                <Following>
                  {userProfile?.isBeingFollowedByYou && (
                    <FollowsYou>
                      Follows you
                      {/* {userProfile?.isBeingFollowedByYou ? "Follows you" : ""} */}
                    </FollowsYou>
                  )}
                </Following>
              </UnderName>
            </NameSection>
            {/* best friend with text */}
            <Status>{userProfile?.bio}</Status>
            {/* location and stuff */}
            <UnderStatus>
              <LocationTime>
                <Location>
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {userData.location
                    ? userProfile?.location
                    : "Location Unknown"}
                </Location>
                <Time>
                  <i className="far fa-calendar-alt"></i> Joined{" "}
                  {moment(userProfile?.joined).format(" MMMM YYYY")}
                </Time>
              </LocationTime>

              {/* do it later after you fix the BE  */}

              <Followers>
                <div>
                  <Span>{userProfile?.numFollowing}</Span> following
                </div>
                <div>
                  <Span>{userProfile?.numFollowers}</Span> followers
                </div>
              </Followers>
            </UnderStatus>
          </TextSection>
          <FeedRendering handle={handle} name={userProfile.displayName} />
        </Master>
      )}
    </>
  );
};

const Master = styled.div`
  max-width: 1200px;
  min-width: 700px;
`;
const TextSection = styled.div`
  padding-left: 20px;
  border-bottom: 1px solid var(--twitter-background);
`;

const Banner = styled.img`
  margin-top: 0;
  height: 200px;
  width: 100%;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 130px;
  margin-top: -80px;
  margin-left: 17px;
  width: auto;
  border: 3.5px solid white;
`;

const FollowButton = styled.button`
  display: flex;
  color: var(--primary);
  font-weight: 900;
  font-size: 14px;
  background-color: ${({ followingText }) => {
    return followingText && "#e8f5fe";
  }};
  border-radius: 30px;
  padding: 7px 20px;
  /* box-shadow: violet; */
  border: 2px solid #68359b;
  transition: all 300ms ease-out;
  &&:active {
    transform: scale(0.8);
  }
  z-index: -1;
  margin-left: auto;
  margin-top: -20px;
  margin-right: 10px;
`;

const NameSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 20px;
`;

const Span = styled.span`
  font-weight: 700;
`;

const UnderName = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Handle = styled.div`
  color: rgb(101, 119, 134);
  font-weight: 700;
  font-size: 14px;
`;

const Following = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const FollowsYou = styled.div`
  background-color: lightgray;
  color: rgb(101, 119, 134);
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
`;

const YouFollow = styled.div`
  background-color: lightgray;
  color: rgb(101, 119, 134);
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
`;

const Status = styled.div`
  font-weight: 700;
  font-size: 17px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const UnderStatus = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LocationTime = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const Location = styled.div``;

const Time = styled.div``;

const Followers = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-bottom: 40px;
`;

export default Profile;
