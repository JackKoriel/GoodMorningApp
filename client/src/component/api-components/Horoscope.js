import React, { useState, useContext, useEffect } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import styled from "styled-components";
import { FiStar } from "react-icons/fi";
import { PostContext } from "../contexts/PostContext";
import { HeartSpinner } from "react-spinners-kit";

//dummy data used for testing to not spam the limited API
const dummyData = {
  date_range: "Sep 23 - Oct 22",
  current_date: "January 19, 2022",
  description:
    "The astrological outlook for your career looks promising right now -- to say the very least. Talk over those petty, aggravating details with a higher-up. You'll be pleasantly surprised.",
  compatibility: "Taurus",
  mood: "Hopeful",
  color: "Green",
  lucky_number: "83",
  lucky_time: "2am",
};

const Horoscope = () => {
  const {
    actions: { clearFeed },
    setStart,
    horoStatus,
    setHoroStatus,
  } = useContext(PostContext);
  const {
    user: { email, favorite, sign },
    update,
    setUpdate,
  } = useContext(currentUserContext);

  const [dailyHoro, setDailyHoro] = useState(dummyData);
  const [newsUpdated, setNewsUpdated] = useState(true);

  const handleClickFavorite = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    fetch(`/api/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        dailyHoro,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          //to update homefeed so it doesn't create dupes due to the user update
          clearFeed();
          setStart(0);
          //to update the favorite list
          setUpdate(!update);
          setHoroStatus(!horoStatus);
        }
      });
  };

  //comment out when using dummy data
  // useEffect(() => {
  //   setNewsUpdated(false);
  //   fetch("/api/horoscope", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       day: "today",
  //       sign: sign,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDailyHoro(data.data);
  //       setNewsUpdated(true);
  //     })
  //     .catch((err) => {});
  // }, [sign]);

  return (
    <>
      {!newsUpdated ? (
        <Progress>
          <HeartSpinner color="var(--blue-color)" />
        </Progress>
      ) : (
        <MasterContainer>
          <Background src="https://res.cloudinary.com/dhj5ncbxs/image/upload/v1639173158/692599_astrology-backgrounds-wallpapers-zone_1299x1122_h_n7s4aa.jpg" />
          <Desc>{dailyHoro.description}</Desc>
          <LuckyNum>
            Lucky number of the day: <strong>{dailyHoro.lucky_number}</strong>
          </LuckyNum>
          <LuckyTime>
            Lucky time of the day: <strong>{dailyHoro.lucky_time}</strong>
          </LuckyTime>
          <Compat>
            Compatible with: <strong>{dailyHoro.compatibility}</strong>
          </Compat>
          <LuckyColor>
            Lucky color of the day:{" "}
            <strong>
              <Span color={dailyHoro.color}>{dailyHoro.color}</Span>
            </strong>
          </LuckyColor>
          <StarFav
            onClick={(ev) => {
              handleClickFavorite(ev);
            }}
          >
            {favorite.includes(dailyHoro.current_date) ? (
              <FiStar style={FavStyleActive} />
            ) : (
              <FiStar />
            )}
          </StarFav>
        </MasterContainer>
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
  height: 120px;
`;

const MasterContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  border: 2px solid var(--yellow-color);
  flex: 0.3;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  padding-bottom: 20px;
`;

const StarFav = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  color: white;
  bottom: 0px;
  right: 0px;
  font-size: 30px;
  transition: all 400ms ease-in-out;
  z-index: 2;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const FavStyleActive = {
  fill: "yellow",
};

const Background = styled.img`
  position: absolute;
  width: inherit;
  height: 100%;
  z-index: 1;
  opacity: 0.9;
  /* background: rgba(0, 0, 0, 0.6);
  opacity: 0; */
  border-radius: 5px;
`;

const Desc = styled.div`
  padding: 0 10px;
  margin-top: 10px;
  font-weight: 900;
  margin-bottom: 10px;
  text-align: center;
  z-index: 2;
`;

const LuckyTime = styled.div`
  z-index: 2;
`;

const LuckyNum = styled.div`
  z-index: 2;
`;

const Compat = styled.div`
  z-index: 2;
`;

const LuckyColor = styled.div`
  z-index: 2;
`;

const Span = styled.span`
  color: ${({ color }) => {
    return color;
  }};
`;

export default Horoscope;
