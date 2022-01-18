import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { HeartSpinner } from "react-spinners-kit";
import { FiXCircle } from "react-icons/fi";
import { FiMeh } from "react-icons/fi";
import { currentUserContext } from "../contexts/CurrentUserContext";
import { PostContext } from "../contexts/PostContext";

const Favorite = () => {
  const { update, setUpdate } = useContext(currentUserContext);
  const { horoStatus } = useContext(PostContext);
  const [favList, setFavList] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetch(`/api/favorite`)
        .then((res) => res.json())
        .then((data) => {
          setFavList(data.data);
          setStatus("active");
        })
        .catch((err) => {});
    }
    return () => {
      isMounted = false;
    };
  }, [status, horoStatus]);

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
        setUpdate(!update);
      })
      .catch((err) => {});
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
          <HeartSpinner color="var(--blue-color)" /> Loading...
        </Progress>
      ) : (
        <MasterContainer>
          {favList.map((horoscope) => {
            return (
              <HoroContainer key={horoscope._id}>
                <Background src="https://res.cloudinary.com/dhj5ncbxs/image/upload/a_90/v1639194354/wp4064809_kaomgc.jpg" />
                <Desc>{horoscope.description}</Desc>

                <LuckyNum>
                  Lucky number of the day:{" "}
                  <strong>{horoscope.lucky_number}</strong>
                </LuckyNum>

                <LuckyTime>
                  {" "}
                  Lucky time of the day: <strong>{horoscope.lucky_time}</strong>
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
                    onMouseOver={({ target }) =>
                      (target.style.fill = "var(--blue-color)")
                    }
                    style={{ fill: "white" }}
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
  align-items: start;
  margin-top: 0;
  max-width: 700px;
  width: 650px;
  background-color: var(--beige-color);
  padding: 100px 15px;
`;

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

const MasterContainer = styled.div`
  background: var(--beige-color);
  max-width: 700px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 0 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Background = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: -10;
  opacity: 0.8;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const HoroContainer = styled.div`
  margin: 10px 0;
  padding: 10px 20px;
  position: relative;
  /* top: -990px; */
  text-decoration: none;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid var(--yellow-color);
  justify-content: center;
  align-items: center;
  line-height: 35px;
  z-index: 1;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
