import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { FiXCircle } from "react-icons/fi";
import { FiMeh } from "react-icons/fi";

const Favorite = () => {
  const [favList, setFavList] = useState([]);
  const [status, setStatus] = useState("idle");
  console.log("favlist", favList);

  useEffect(() => {
    fetch(`/api/favorite`)
      .then((res) => res.json())
      .then((data) => {
        console.log("fetch data", data);
        setFavList(data.data);
        setStatus("active");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);

  const handleRemove = (ev, _id, current_date) => {
    ev.preventDefault();
    ev.stopPropagation();

    fetch(`/api/favorite/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        current_date,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (favList === undefined) {
    return (
      <Empty>
        <h1>
          You have no favorite horoscopes <FiMeh />
        </h1>
      </Empty>
    );
  }

  return (
    <>
      {status === "idle" ? (
        <Progress>
          <CircularProgress /> Loading...
        </Progress>
      ) : (
        <MasterContainer>
          <Background src="https://res.cloudinary.com/dhj5ncbxs/image/upload/a_90/v1639194354/wp4064809_kaomgc.jpg" />
          {favList.map((horoscope) => {
            return (
              <HoroContainer key={horoscope._id}>
                <Desc>{horoscope.description}</Desc>

                <LuckyNum>
                  Lucky number of the day:{" "}
                  <strong>{horoscope.lucky_number}</strong>
                </LuckyNum>

                <LuckyTime>
                  {" "}
                  Lucky time of the day:{" "}
                  <strong>{horoscope.lucky_number}</strong>
                </LuckyTime>

                <Compat>
                  Compatible with: <strong> {horoscope.compatibility}</strong>
                </Compat>

                <LuckyColor>
                  Lucky color of the day:{" "}
                  <strong>
                    <Span color={horoscope.color}>{horoscope.color}</Span>
                  </strong>
                </LuckyColor>
                <ButtonRemove
                  onClick={(ev) => {
                    handleRemove(ev, horoscope._id, horoscope.current_date);
                  }}
                >
                  <FiXCircle
                    onMouseOver={({ target }) => (target.style.fill = "pink")}
                    onMouseOut={({ target }) => (target.style.fill = "white")}
                  />
                </ButtonRemove>
              </HoroContainer>
            );
          })}
        </MasterContainer>
      )}
    </>
  );
};

const Empty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
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

const MasterContainer = styled.div`
  /* border: 1px solid red; */
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* overflow: scroll; */
  /* margin: 20px 0; */
  /* text-decoration: none; */
`;

const Background = styled.img`
  position: relative;
  width: inherit;
  height: inherit;
  z-index: -100;
  opacity: 0.8;
`;

const HoroContainer = styled.div`
  padding: 10px 0;
  position: absolute;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid var(--morning-background);
  justify-content: center;
  align-items: center;
`;

const ButtonRemove = styled.button`
  position: absolute;
  bottom: 5px;
  left: 5px;
  border: none;
  background: none;
  font-size: 30px;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
    fill: red;
  }
`;
const Desc = styled.div`
  font-weight: 900;
  margin-bottom: 10px;
  text-align: center;
  font-size: 20px;
  text-shadow: -0.5px 0.5px 0 #ffffff, 0.5px 0.5px 0 #ffffff,
    0.5px -1px 0 #ffffff, -0.5px -0.5px 0 #ffffff;
`;

const LuckyTime = styled.div`
  font-size: 17px;
`;

const LuckyNum = styled.div`
  font-size: 17px;
`;

const Compat = styled.div`
  font-size: 17px;
`;

const LuckyColor = styled.div`
  font-size: 17px;
`;

const Span = styled.span`
  color: ${({ color }) => {
    return color;
  }};
`;

export default Favorite;
