import React, { useState, useContext, useEffect } from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import styled from "styled-components";
import { FiBookmark } from "react-icons/fi";
import { PostContext } from "../contexts/PostContext";
import { HeartSpinner } from "react-spinners-kit";

//dummy data used for testing to not spam the limited API
const dummyData = [
  {
    summary:
      "The issue appeared to impact the Boeing 777, a long-range, wide-body aircraft used by carriers across the world. Two Japanese airlines directly named the aircraft as being particularly affected by the 5G signals as they announced cancellations and changes to their schedules. Dubai-based Emirates, a key carrier for East-West travel, announced it would halt flights to Boston, Chicago, Dallas-Fort Worth, Houston, Miami, Newark, New Jersey, Orlando, Florida, San Francisco and Seattle over the issue beginning Wednesday.",
    country: "CA",
    author: "Zone Économie - ICI.Radio-Canada.ca",
    link: "https://ici.radio-canada.ca/rci/en/news/1855528/airlines-worldwide-rush-to-change-flights-over-u-s-5g-dispute",
    language: "en",
    media:
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/5g-airlines.png",
    title: "Airlines worldwide rush to change flights over U.S. 5G dispute",
    media_content: [
      "https://ici.radio-canada.ca/rci/svg/logos/logo-rci-en.svg",
      "https://ici.radio-canada.ca/rci/svg/audio-offer/cbc-listen.svg",
      "https://ici.radio-canada.ca/rci/svg/logos/logo-rci-colors-en.svg",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/health-coronavirus-canada-vaccine.png",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/radio-prague.svg",
      "https://ici.radio-canada.ca/rci/svg/logos/logo-cbc-src-white.svg",
      "https://images.radio-canada.ca/q_auto,w_635/v1/infolettres/17x6/rci-radio-canada-international-anglais-infolettre-promo.jpg",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/swiss-info.svg",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/school-assignment.png",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/melanie-joly-85061.png",
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/5g-airlines.png",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/radio-romania.svg",
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/covid-sask-2021.png",
      "https://ici.radio-canada.ca/rci/svg/audio-offer/ohdio.svg",
      "https://images.radio-canada.ca/q_auto,w_700/v1/ici-info/16x9/faa-planes-5g-interference.png",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/pandemic-response-unit.png",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/polskie-radio.svg",
    ],
    clean_url: "radio-canada.ca",
    rights: "radio-canada.ca",
    rank: 3299,
    topic: "news",
    published_date: "2022-01-19 20:52:00",
    _id: "0f6a7806a624d6cfcfee76bc414ec371",
  },
  {
    summary:
      "These contracts (new window) for synthetic rubber medical gloves, worth over $222 million, were part of the $8 billion push led by former procurement minister Anita Anand to equip Canadian health care workers with the personal protective equipment they needed during the COVID-19 pandemic. In November, the department announced that deliveries from this company were being held (new window) until the government could review the results of an independent audit of Supermax's operations. Based on the seriousness of the allegations and expected timelines for the final audit results, the Government of Canada has decided, and Supermax Healthcare Canada has agreed, to terminate by mutual consent the two existing contracts for the supply of nitrile gloves, the department told CBC News in an email Tuesday, confirming an earlier report from Reuters that Canada's contract with the Malaysian supplier had ended.",
    country: "CA",
    author: "Zone Politique - ICI.Radio-Canada.ca",
    link: "https://ici.radio-canada.ca/rci/en/news/1855522/canada-terminates-222m-ppe-contract-following-forced-labour-probe",
    language: "en",
    media:
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/covid-sask-2021.png",
    title: "Canada terminates $222M PPE contract following forced labour probe",
    media_content: [
      "https://ici.radio-canada.ca/rci/svg/logos/logo-rci-colors-en.svg",
      "https://ici.radio-canada.ca/rci/svg/audio-offer/cbc-listen.svg",
      "https://ici.radio-canada.ca/rci/svg/audio-offer/ohdio.svg",
      "https://images.radio-canada.ca/q_auto,w_700/v1/ici-info/16x9/healthcare-workers-in-ppe.png",
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/health-coronavirus-canada-vaccine.png",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/radio-prague.svg",
      "https://ici.radio-canada.ca/rci/svg/logos/logo-cbc-src-white.svg",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/pandemic-response-unit.png",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/melanie-joly-85061.png",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/swiss-info.svg",
      "https://ici.radio-canada.ca/rci/svg/logos/logo-rci-en.svg",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/polskie-radio.svg",
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/covid-sask-2021.png",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/premier-ministre-alberta-jason-kenney.JPG",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/radio-romania.svg",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/school-assignment.png",
      "https://images.radio-canada.ca/q_auto,w_635/v1/infolettres/17x6/rci-radio-canada-international-anglais-infolettre-promo.jpg",
    ],
    clean_url: "radio-canada.ca",
    rights: "radio-canada.ca",
    rank: 3299,
    topic: "news",
    published_date: "2022-01-19 20:12:00",
    _id: "446e1b0782863515383a197e76239421",
  },
  {
    summary:
      "Average sea surface temperatures in October and November were the highest in 40 years Issue appears to affect the Boeing 777, used by carriers around the world U.S. authorities banned disposable gloves manufactured by Supermax in Malaysia on Oct. 21 No decision yet on whether to supply Kyiv with weapons, foreign minister says19 hours agoInternational Textbook exercise offers anti-immigration arguments, such as 'some immigrants draw on social welfare programs'",
    country: "CA",
    author: "Zone Économie - ICI.Radio-Canada.ca",
    link: "https://ici.radio-canada.ca/rci/en/news/1855511/canadas-inflation-rate-rises-to-new-30-year-high-of-4-8-",
    language: "en",
    media:
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/health-coronavirus-canada-vaccine.png",
    title: "Canada's inflation rate rises to new 30-year high of 4.8%",
    media_content: [
      "https://ici.radio-canada.ca/rci/svg/logos/logo-rci-en.svg",
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/covid-sask-2021.png",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/melanie-joly-85061.png",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/radio-romania.svg",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/premier-ministre-alberta-jason-kenney.JPG",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/swiss-info.svg",
      "https://ici.radio-canada.ca/rci/svg/logos/logo-cbc-src-white.svg",
      "https://ici.radio-canada.ca/rci/svg/audio-offer/cbc-listen.svg",
      "https://images.radio-canada.ca/q_auto,w_700/v1/ici-info/16x9/inflation-soaring.png",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/polskie-radio.svg",
      "https://images.radio-canada.ca/q_auto,w_635/v1/ici-info/16x9/health-coronavirus-canada-vaccine.png",
      "https://ici.radio-canada.ca/rci/svg/audio-offer/ohdio.svg",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/pandemic-response-unit.png",
      "https://ici.radio-canada.ca/rci/svg/logos/logo-rci-colors-en.svg",
      "https://images.radio-canada.ca/q_auto,w_635/v1/infolettres/17x6/rci-radio-canada-international-anglais-infolettre-promo.jpg",
      "https://images.radio-canada.ca/q_auto,w_160/v1/ici-info/1x1/school-assignment.png",
      "https://ici.radio-canada.ca/rci/svg/partners-logos/radio-prague.svg",
    ],
    clean_url: "radio-canada.ca",
    rights: "radio-canada.ca",
    rank: 3299,
    topic: "news",
    published_date: "2022-01-19 19:12:00",
    _id: "a1513ac3eb6c5e279385a37db853296f",
  },
  {
    summary:
      "Retirement. It's the dream we all work for. We work away at a job we may not even like for the majority of our lives, all to reach that end goal. But what if this was the year? What if 2022 was the year you decided it was time to retire? © Provided by The Motley Fool Retirement Well, guess what. You can! And frankly, it doesn't matter what age you are. You could be 75, you could 35. If you want a retirement lifestyle, it's really up to you. All you have to do is follow these tips. Create an emergency fund Emergencies happen.",
    country: "CA",
    author: "Not available",
    link: "https://www.fool.ca/2022/01/19/make-2022-the-year-you-retire-with-these-tips/?source=cts401cs0010001",
    language: "en",
    media:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AALby1D.img?h=315&w=600&m=6&q=60&o=t&l=f&f=jpg",
    title: "Make 2022 the Year You Retire With These Tips",
    media_content: [
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AALby1D.img?h=315&w=600&m=6&q=60&o=t&l=f&f=jpg",
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB16ZpNs.img?h=40&w=138&m=6&q=60&o=f&l=f&f=png",
      "https://sb.scorecardresearch.com/p?c1=2&c2=3000001&cs_ucfr=1&rn=637782089064918238&c7=https%253A%252F%252Fwww.msn.com%252Fen-ca%252Fmoney%252Ftopstories%252Fmake-2022-the-year-you-retire-with-these-tips%252Far-AASWqg4&c8=&c9=",
      "https://c.msn.com/c.gif?udc=true&rid=2d6b283396304c1daa561677154a8485&rnd=637782089064918238&rf=&tp=https%253A%252F%252Fwww.msn.com%252Fen-ca%252Fmoney%252Ftopstories%252Fmake-2022-the-year-you-retire-with-these-tips%252Far-AASWqg4&di=789&lng=en-ca&activityId=2d6b283396304c1daa561677154a8485&d.dgk=tmx.pc.webkit.chrome&d.imd=0&st.dpt=finance-top-stories&st.sdpt=&subcvs=finance&pg.n=articleflex&pg.t=article&pg.c=&pg.p=prime&anoncknm=&issso=0&aadState=0",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      "https://static-entertainment-eus-s-msn-com.akamaized.net/sc/9b/e151e5.gif",
    ],
    clean_url: "fool.ca",
    rights: "msn.com",
    rank: 54743,
    topic: "finance",
    published_date: "2022-01-19 17:00:00",
    _id: "13c20fb4169efba77ed583f2e825a844",
  },
  {
    summary:
      "View image in full screen Dr. Joss Reimer, medical lead for Manitoba's vaccine rollout, speaks about COVID-19 vaccination initiatives and answers media questions during a news conference at the Manitoba legislature in Winnipeg on Wednesday, March 17, 2020. Manitoba is allowing two groups to receive their booster shots ahead of the recommended six-month wait time. THE CANADIAN PRESS/John Woods. JGW Manitoba health officials will update the province Wednesday on the latest COVID-19 and vaccination numbers.",
    country: "CA",
    author: "Elisha Dacey",
    link: "https://globalnews.ca/news/8523590/manitoba-health-officials-to-give-covid-19-vaccination-update",
    language: "en",
    media:
      "https://globalnews.ca/wp-content/uploads/2021/12/2021121017124-61b3cf73a0f75bc8eaa83f4fjpeg-1.jpg?quality=85&strip=all&w=720&h=379&crop=1",
    title: "Manitoba health officials to give COVID-19, vaccination update",
    media_content: [
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/alert.png",
      "https://globalnews.ca/wp-content/uploads/2021/12/2021121017124-61b3cf73a0f75bc8eaa83f4fjpeg-1.jpg?quality=85&strip=all&w=720&h=379&crop=1",
      "https://sb.scorecardresearch.com/p?c1=2&c2=3005670&c3=&c4=&c5=&c6=&c15=&cv=2.0&cj=1",
      "https://globalnews.ca/wp-content/uploads/2022/01/GlobalAMRadio_1000x230_Logo-on-Light-BK_680CJOB.png?w=320",
      "https://globalnews.ca/wp-content/uploads/2018/07/elisha-dacey-1-e1582730598365.jpg?quality=85&strip=all&w=136&h=136&crop=1",
      "https://d21y75miwcfqoq.cloudfront.net/70c8fc80",
      "https://globalnews.ca/wp-content/uploads/2022/01/GlobalAMRadio_200x200_Square-Logo_680CJOB.png?w=200",
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/ad-choices.png",
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/logo-morty.svg",
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/shield.png",
      "https://globalnews.ca/wp-content/uploads/2018/04/680-CJOB_300x300_HalAnderson_v1.png?w=200&h=200&crop=1",
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/logo-mobile.svg",
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/logo-text.svg",
      "https://globalnews.ca/wp-content/uploads/2021/12/2021121017124-61b3cf73a0f75bc8eaa83f4fjpeg-1.jpg?quality=85&strip=all",
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/shield-blue.png",
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/alert-red.png",
      "https://globalnews.ca/wp-content/themes/shaw-globalnews/assets/dist/images/morty.svg",
    ],
    clean_url: "globalnews.ca",
    rights: "globalnews.ca",
    rank: 890,
    topic: "news",
    published_date: "2022-01-19 16:59:53",
    _id: "2c358cd7db8090abf00f6ee31aa64fa2",
  },
];

const News = () => {
  const {
    actions: { clearFeed },
    setStart,
    newsStatus,
    setNewsStatus,
  } = useContext(PostContext);
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
          //to update homefeed so it doesn't create dupes due to the user update
          clearFeed();
          setStart(0);
          //to update the reading list
          // setReadingL(true);
          setUpdate(!update);
          setNewsStatus(!newsStatus);
        }
      });
  };

  //comment out when using dummy data to not spam API while testing
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
