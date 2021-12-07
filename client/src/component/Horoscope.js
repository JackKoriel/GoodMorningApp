import React, { useEffect, useState } from "react";

const Horoscope = () => {
  const [dailyHoro, setDailyHoro] = useState([]);
  console.log("dailyhoro", dailyHoro);

  useEffect(() => {
    fetch("/api/horoscope", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        day: "today",
        sign: "aquarius",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setDailyHoro(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>Horscope page</div>;
};

export default Horoscope;
