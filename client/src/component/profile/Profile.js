import React, { useContext, useState, useEffect } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import { PostContext } from "../contexts/PostContext";
import { useParams } from "react-router-dom";
import { HeartSpinner } from "react-spinners-kit";
import FeedRendering from "./FeedRendering";
import styled from "styled-components";
import { GiSpellBook } from "react-icons/gi";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const { handle } = useParams();
  let history = useHistory();
  const { user, update, setUpdate } = useContext(currentUserContext);
  const {
    actions: { clearFeed },
    setStart,
    isUpdatingPost,
    setIsUpdatingPost,
  } = useContext(PostContext);
  const [userData, setUserData] = useState({});
  const [status, setStatus] = useState(false);
  const [followingText, setFollowingText] = useState(
    user.followingIds?.includes(handle)
  );

  // console.log("followign IDs ", user.followingIds);
  // console.log("the boolean", followingText);

  //to render the following button
  // const [update, setUpdate] = useState(false);

  //get user data from DB
  useEffect(() => {
    fetch(`/api/users/${handle}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setStatus(true);
      })
      .catch((err) => {});
  }, [handle, update]);

  //follow or unfollow users
  const followingButtonHandle = (ev) => {
    ev.preventDefault();
    if (followingText) {
      fetch(`/api/${handle}/profile/unfollow`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFollowingText(false);
          clearFeed();
          setStart(0);
          setUpdate(!update);
          // setIsUpdatingPost(!isUpdatingPost);
        })
        .catch((err) => {});
    } else {
      fetch(`/api/${handle}/profile/follow`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFollowingText(true);
          clearFeed();
          setStart(0);
          setUpdate(!update);
          // setIsUpdatingPost(!isUpdatingPost);
        })
        .catch((err) => {});
    }
  };

  //message a user
  const handleMessageClick = () => {
    // console.log("click");
    fetch(`/api/conversation`, {
      method: "POST",
      body: JSON.stringify({
        senderId: user._id,
        receiverId: userData._id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        if (res.status === 201 || res.status === 200) {
          history.push(`/messenger`);
        }
      })
      .catch((err) => {});
  };

  //change the text on the button after each click
  let followingFinalText;
  followingText
    ? (followingFinalText = "Following")
    : (followingFinalText = "Not following");

  let userProfile = {};
  handle === user.handle ? (userProfile = user) : (userProfile = userData);

  return (
    <>
      {!status ? (
        <Progress>
          <HeartSpinner color="var(--blue-color)" /> Loading...
        </Progress>
      ) : (
        <Master>
          <div>
            <Banner src={userProfile?.bannerSrc} />
            <Avatar src={userProfile?.avatarSrc} />

            {userProfile?.handle !== user?.handle && (
              <ButtonsContainer>
                <FollowButton
                  followingText={followingText}
                  onClick={(ev) => followingButtonHandle(ev)}
                >
                  {followingFinalText}
                </FollowButton>
                <MessageButton onClick={() => handleMessageClick()}>
                  Message
                </MessageButton>
              </ButtonsContainer>
            )}
          </div>
          {/* username and stuff */}
          <TextSection>
            <NameSection>
              <Name>{userProfile?.displayName}</Name>
              <UnderName>
                <Handle>@{userProfile?.handle} </Handle>
              </UnderName>
            </NameSection>
            {/* best friend with text */}
            <Status>{userProfile?.bio}</Status>
            {/* location and stuff */}
            <UnderStatus>
              <LocationTime>
                <Location>
                  <i className="fas fa-map-marker-alt"></i> Location{" "}
                  {userData.country ? (
                    <strong>
                      {`${userProfile?.city}, ${userProfile?.country}`}
                    </strong>
                  ) : (
                    <strong>Unknown</strong>
                  )}
                </Location>
                <Time>
                  <i className="far fa-calendar-alt"></i> Joined{" "}
                  <strong>{userProfile?.joined}</strong>
                </Time>
                <Horoscope>
                  <GiSpellBook style={{ fontSize: "22px" }} /> Sign{" "}
                  <strong>{userProfile?.sign}</strong>
                </Horoscope>
              </LocationTime>
              <Followers>
                <div>
                  following <Span>{userProfile?.followingIds.length}</Span>
                </div>
                <div>
                  followers <Span>{userProfile?.followerIds.length}</Span>
                </div>
              </Followers>
            </UnderStatus>
          </TextSection>
          <FeedRendering
            handle={handle}
            name={userProfile.displayName}
            userHandle={userProfile.handle}
            friend={userProfile.handle}
            currentUser={user.handle}
          />
        </Master>
      )}
    </>
  );
};

const Progress = styled.div`
  background-color: var(--beige-color);
  width: 650px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
`;

const Master = styled.div`
  background: var(--beige-color);
  max-width: 700px;
  width: 650px;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  gap: 20px;
  overflow: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;
const TextSection = styled.div`
  padding-left: 20px;
  border-bottom: 1px solid var(--yellow-color);
`;

const Banner = styled.img`
  margin-top: 0;
  height: 250px;
  width: 100%;
  border-radius: 10px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 130px;
  margin-top: -80px;
  margin-left: 17px;
  width: auto;
  border: 3.5px solid white;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  margin-left: auto;
  /* margin-top: -20px; */
  /* margin-right: 10px; */
`;
const FollowButton = styled.button`
  display: flex;
  color: var(--blue-color);
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
  /* z-index: -1; */
  /* margin-left: auto;
  margin-top: -20px;
  margin-right: 10px; */
`;

const MessageButton = styled.button`
  display: flex;
  color: var(--blue-color);
  font-weight: 900;
  font-size: 14px;
  border-radius: 30px;
  padding: 7px 20px;
  border: 2px solid #68359b;
  transition: all 300ms ease-out;
  &&:active {
    transform: scale(0.8);
  }
  /* z-index: -1; */
  /* margin-left: auto;
  margin-top: -20px;
  margin-right: 10px; */
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
  align-items: center;
  flex-direction: row;
  gap: 30px;
`;

const Horoscope = styled.div`
  /* display: flex;
  flex-direction: row;
  gap: 30px; */
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
