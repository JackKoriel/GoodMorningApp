import React, { useEffect, useState } from "react";

const News = () => {
  const [topNews, setTopNews] = useState([]);
  console.log("topNews", topNews);

  useEffect(() => {
    fetch("/api/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        country: "CA",
        lang: "en",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTopNews(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div>News page</div>;
};

export default News;
