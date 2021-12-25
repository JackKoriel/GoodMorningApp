import React, { useState, useContext, useEffect } from "react";
import { currentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { FiBookmark } from "react-icons/fi";
import { PostContext } from "./PostContext";
import { HeartSpinner } from "react-spinners-kit";

const dummyData = [
  {
    summary:
      "The text contains the error Comment Send Selected text is too large, select smaller text.",
    country: "unknown",
    author: "{[authorName]} {[authorPost]}",
    link: "http://infobrics.org",
    language: "en",
    media: "http://infobrics.org/media/russia/maxim/India-Ros.jpg",
    title: "India-Russia Ties",
    media_content: [
      "http://infobrics.org/media/russia/maxim/India-Ros.jpg",
      "http://infobrics.org/img/footer/cabinet/cabinet_en.png",
      "http://infobrics.org/img/footer/logo/footer-logo.png",
      "http://infobrics.org/{[photo]}",
      "http://infobrics.org/img/logo_south.png",
      "https://mc.yandex.ru/watch/42378879",
      "http://infobrics.org/{[logo]}",
    ],
    clean_url: "infobrics.org",
    rights: "Inforos Co., Ltd",
    rank: 278568,
    topic: "news",
    published_date: "2021-12-13 07:22:54",
    _id: "35d042a15bdba851588e9c442a5c8ec1",
  },
  {
    summary:
      "U.S. liquefied natural gas export capacity will become the world's largest by the end of 2022 as new and expanded Gulf Coast facilities come online, the federal Energy Information Administration (EIA) said this month.Why it matters: The milestone underscores U.S. emergence as a major crude oil and natural gas exporter as production from shale fields has boomed and crude export restrictions were lifted in 2015.The big picture: Last year the U.S. became the world's third-largest LNG exporter behind Australia and Qatar, EIA notes, and now appears to have already pulled even with Qatar.",
    country: "US",
    author: "Ben Geman",
    link: "https://www.axios.com/lng-export-capacity-energy-milestone-d0f9e3bd-931f-4d39-82c7-00fff542b3e7.html",
    language: "en",
    media:
      "https://images.axios.com/nZi9W9SGwEwhRFVC0oKsGv7wfjI=/0x306:4000x2556/1366x768/2021/12/10/1639140494893.jpg",
    title: "A looming energy milestone for the U.S.",
    media_content: [
      "https://images.axios.com/nZi9W9SGwEwhRFVC0oKsGv7wfjI=/0x306:4000x2556/1366x768/2021/12/10/1639140494893.jpg",
    ],
    clean_url: "axios.com",
    rights: "axios.com",
    rank: 1239,
    topic: "news",
    published_date: "2021-12-13 12:54:18",
    _id: "311a67f9914304842c416854063273b2",
  },
  {
    summary:
      "The Identity, Authentication, and Access (IAA) market is set to grow by 13.4% in revenues in 2021 reaching $28.9bn, according to Omdia's latest Identity Authentication Access Market Tracker. During 2021, the increasing number of security breaches and attacks has brought into even sharper focus the need for strong identity, authentication, and access technology. Identity has never been more important for cybersecurity than now. In this sense, COVID-19 merely turbocharged a tendency that had been underway for several years, i.",
    country: "unknown",
    author: "Don TaitSenior Analyst, Omdia",
    link: "https://www.darkreading.com/omdia/identity-authentication-access-market-set-to-hit-28-9b-in-2021",
    language: "en",
    media:
      "https://eu-images.contentstack.com/v3/assets/blt66983808af36a8ef/blt2370149aa096adb9/61b38ac689fca95dc5b45fc0/Tait_211213_Featured_Image.png",
    title: "Identity Authentication Access Market Set to Hit $28.9B in 2021",
    media_content: [
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIi8+",
      "https://eu-images.contentstack.com/v3/assets/blt66983808af36a8ef/blt3edeb23396a4b5dc/60b1ea7a9afdef577986633e/Whitelogo_1.png",
      "https://www.darkreading.com/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fimages%2Firibbon-logo.61822a6f728dd50c5ab494ce9936bac3.png&w=256&q=75",
      "https://eu-images.contentstack.com/v3/assets/blt66983808af36a8ef/blt2370149aa096adb9/61b38ac689fca95dc5b45fc0/Tait_211213_Featured_Image.png?quality=80&format=jpg&width=690",
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      "https://eu-images.contentstack.com/v3/assets/blt66983808af36a8ef/blt2370149aa096adb9/61b38ac689fca95dc5b45fc0/Tait_211213_Featured_Image.png",
    ],
    clean_url: "darkreading.com",
    rights: "Copyright (C) 2000-2021 Dark Reading - All rights reserved.",
    rank: 3783,
    topic: "tech",
    published_date: "2021-12-13 09:00:00",
    _id: "9caae65dd1c27019e8395fb4117dbc76",
    isReadingList: true,
  },
  {
    summary:
      "The text contains the error Comment Send Selected text is too large, select smaller text.",
    country: "unknown",
    author: "{[authorName]} {[authorPost]}",
    link: "http://infobrics.org",
    language: "en",
    media: "http://infobrics.org/media/russia/maxim/Putin-Modi.jpg",
    title:
      "Banking on Each Other: India, Russia and the New Era of Global Politics",
    media_content: [
      "http://infobrics.org/img/logo_south.png",
      "http://infobrics.org/img/footer/logo/footer-logo.png",
      "http://infobrics.org/{[logo]}",
      "http://infobrics.org/media/russia/maxim/Putin-Modi.jpg",
      "http://infobrics.org/img/footer/cabinet/cabinet_en.png",
      "https://mc.yandex.ru/watch/42378879",
      "http://infobrics.org/{[photo]}",
    ],
    clean_url: "infobrics.org",
    rights: "Inforos Co., Ltd",
    rank: 278568,
    topic: "news",
    published_date: "2021-12-13 07:27:31",
    _id: "19f4939090e176495fe639502dabe6c8",
  },
  {
    summary:
      "The text contains the error Comment Send Selected text is too large, select smaller text.",
    country: "unknown",
    author: "{[authorName]} {[authorPost]}",
    link: "http://infobrics.org",
    language: "en",
    media: "http://infobrics.org/media/russia/maxim/India-Ros.jpg",
    title:
      "India-Russia Ties Multifaceted, but More Ballast Is Needed on the Economic Front",
    media_content: [
      "http://infobrics.org/media/russia/maxim/India-Ros.jpg",
      "http://infobrics.org/img/footer/cabinet/cabinet_en.png",
      "http://infobrics.org/img/footer/logo/footer-logo.png",
      "http://infobrics.org/{[photo]}",
      "http://infobrics.org/img/logo_south.png",
      "https://mc.yandex.ru/watch/42378879",
      "http://infobrics.org/{[logo]}",
    ],
    clean_url: "infobrics.org",
    rights: "Inforos Co., Ltd",
    rank: 278568,
    topic: "news",
    published_date: "2021-12-13 07:22:54",
    _id: "35d042a15bdba851588e9c442a5c8e",
  },
];

const News = () => {
  const { newsStatus, setNewsStatus } = useContext(PostContext);
  const {
    user: { country, email, readingList },
    update,
    setUpdate,
  } = useContext(currentUserContext);

  const [topNews, setTopNews] = useState(dummyData);
  const [newsUpdated, setNewsUpdated] = useState(true);
  // const [readingL, setReadingL] = useState(false);

  const handleClickReading = (ev, article) => {
    ev.preventDefault();
    ev.stopPropagation();

    fetch(`/api/reading-list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        article,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 201) {
          // setReadingL(true);
          setUpdate(!update);
          setNewsStatus(!newsStatus);
        }
      });
  };

  // useEffect(() => {
  //   setNewsUpdated(false);
  //   fetch("/api/news", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       country,
  //       lang: "en",
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTopNews(data.data);
  //       setNewsUpdated(true);
  //     })
  //     .catch((err) => {});
  // }, [country]);

  return (
    <>
      {!newsUpdated ? (
        <Progress>
          <HeartSpinner color="var(--blue-color)" />
        </Progress>
      ) : (
        <MasterContainer>
          {topNews?.map((article, index) => {
            return (
              <AnArticle key={article._id} lastArticle={index === 4}>
                <Background src={article.media} />
                <Filter>
                  <Summary>{article.title}</Summary>
                  <Author>{article.author}</Author>
                  <BookmarkButton
                    onClick={(ev) => {
                      handleClickReading(ev, article);
                    }}
                  >
                    {readingList.includes(article._id) ? (
                      <FiBookmark style={bookmarkStyleActive} />
                    ) : (
                      <FiBookmark />
                    )}
                  </BookmarkButton>
                </Filter>
              </AnArticle>
            );
          })}
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
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  flex: 0.5;
  color: white;
  border-radius: 5px;
  gap: 5px;
`;

const AnArticle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--yellow-color);
  /* padding: 5px 0; */
  width: 100%;
  height: 100%;
  /* padding: 5px 0; */
  border-bottom: ${({ lastArticle }) => {
    return lastArticle && "none";
  }};
  transition: all 300ms ease-out;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid var(--gold-color);
    z-index: 3;
  }
`;
const Filter = styled.div`
  position: relative;
  background-color: rgb(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  border-radius: 5px;
  z-index: 2;
  padding: 5px 0;
`;
const BookmarkButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  color: white;
  top: 5px;
  right: 0;
  transition: all 400ms ease-in-out;
  &:hover {
    transform: scale(1.2);
    cursor: pointer;
    fill: white;
  }
`;
const bookmarkStyleActive = {
  fill: "white",
};
const Background = styled.img`
  position: absolute;
  width: inherit;
  height: inherit;
  z-index: 1;
  opacity: 0.9;
  /* background: rgba(0, 0, 0, 0.6);
  opacity: 0; */
  border-radius: 5px;
`;

const Summary = styled.div`
  /* position: absolute; */
  margin-top: 5px;
  font-weight: 900;
  padding: 0 10px;
  line-height: 1.5;
  color: white;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,
    -1px -1px 0 #000;
`;

const Author = styled.div`
  font-size: 10px;
  padding: 0 10px;
`;

export default News;
