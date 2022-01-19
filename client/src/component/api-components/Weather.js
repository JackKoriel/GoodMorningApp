import React, { useState, useContext, useEffect } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import styled from "styled-components";
import { HeartSpinner } from "react-spinners-kit";

//dummy data used for testing to not spam the limited API
let dummyData = {
  last_updated_epoch: 1642612500,
  last_updated: "2022-01-19 12:15",
  temp_c: -16.1,
  temp_f: 3,
  is_day: 1,
  condition: {
    text: "Sunny",
    icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    code: 1000,
  },
  wind_mph: 9.4,
  wind_kph: 15.1,
  wind_degree: 20,
  wind_dir: "NNE",
  pressure_mb: 1009,
  pressure_in: 29.8,
  precip_mm: 4,
  precip_in: 0.16,
  humidity: 80,
  cloud: 0,
  feelslike_c: -23.1,
  feelslike_f: -9.7,
  vis_km: 2,
  vis_miles: 1,
  uv: 1,
  gust_mph: 10.7,
  gust_kph: 17.3,
};

const Weather = () => {
  const {
    user: { city },
  } = useContext(currentUserContext);
  const [dailyForcast, setDailyForcast] = useState(dummyData);
  const [weatherStatus, setWeatherStatus] = useState(true);

  //comment out when using dummy data
  // useEffect(() => {
  //   setWeatherStatus(false);
  //   fetch("/api/weather", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       city,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDailyForcast(data.data.current);
  //       setWeatherStatus(true);
  //     })
  //     .catch((err) => {});
  // }, [city]);

  return (
    <>
      {!weatherStatus ? (
        <Progress>
          <HeartSpinner color="var(--blue-color)" />
        </Progress>
      ) : (
        <MasterContainer>
          <Background src="https://res.cloudinary.com/dhj5ncbxs/image/upload/v1639171975/dai4sky3_zo81od.jpg" />
          <Title>The weather today is:</Title>
          <Rep>
            <Text>{dailyForcast.condition.text}</Text>
            <Image src={dailyForcast.condition.icon} />
          </Rep>
          <Temp>
            <Actual>
              Temprature is {dailyForcast.temp_c} <span>&deg;c</span>
            </Actual>
            <FeelsLike>
              Feels like {dailyForcast.feelslike_c} <span>&deg;c</span>
            </FeelsLike>
          </Temp>
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
  padding-bottom: 20px;
  flex: 0.2;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

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

const Title = styled.div`
  margin-top: 15px;
  font-size: 15px;
  z-index: 2;
`;
const Rep = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 2;
`;
const Text = styled.div`
  font-weight: 700;
`;
const Image = styled.img`
  /* width: 20px; */
`;
const Temp = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  z-index: 2;
  padding: 0 5px;
`;
const Actual = styled.div`
  font-weight: 700;
  text-align: center;
`;

const FeelsLike = styled.div`
  font-weight: 700;
  text-align: center;
`;
export default Weather;
