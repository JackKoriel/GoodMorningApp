import React, { useEffect, useState } from "react";

const Weather = () => {
  const [dailyForcast, setDailyForcast] = useState([]);
  console.log("dailyforcast", dailyForcast);

  useEffect(() => {
    fetch("/api/weather", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        city: "montreal",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDailyForcast(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>Weather page</div>;
};

export default Weather;
