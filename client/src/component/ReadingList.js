import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
import { FiXCircle } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";

const ReadingList = () => {
  const [readingList, setReadingList] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetch(`/api/reading-list`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("fetch data", data);
        setReadingList(data.data);
        setStatus("active");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [status]);

  const handleRemove = (ev, _id) => {
    ev.preventDefault();
    ev.stopPropagation();

    fetch(`/api/reading-list/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (readingList === undefined) {
    return (
      <Empty>
        <h1>
          Reading <FiBookOpen /> list is empty
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
          {readingList.map((article) => {
            return (
              <Article href={article.link} key={article._id}>
                <Image src={article.media} />
                <TextContainer>
                  <Title>{article.title}</Title>
                  <Summary>{article.summary}</Summary>
                  <Author>By {article.author}</Author>
                  <Date>
                    Published on{" "}
                    {moment(article.published_date).format(" MMM Do")}
                  </Date>
                </TextContainer>
                <ButtonRemove
                  onClick={(ev) => {
                    handleRemove(ev, article._id);
                  }}
                >
                  <FiXCircle
                    onMouseOver={({ target }) => (target.style.fill = "pink")}
                    onMouseOut={({ target }) => (target.style.fill = "white")}
                  />
                </ButtonRemove>
              </Article>
            );
          })}
        </MasterContainer>
      )}
      ;
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
  display: flex;
  flex-direction: column;
  /* overflow: scroll; */
  margin: 20px 0;
  /* text-decoration: none; */
`;

const Article = styled.a`
  position: relative;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--morning-background);
  justify-content: center;
  align-items: center;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const ButtonRemove = styled.button`
  position: absolute;
  top: 5px;
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

const Image = styled.img`
  width: 300px;
  height: fit-content;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const TextContainer = styled.div`
  /* text-decoration: none; */
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const Title = styled.div`
  /* text-decoration: none; */
  font-weight: 900;
  font-size: 20px;
  color: black;
`;

const Summary = styled.div`
  font-size: 15px;
  color: #222;
`;

const Author = styled.div`
  font-size: 10px;
  color: #222;
`;

const Date = styled.div`
  font-size: 10px;
  color: #222;
`;

export default ReadingList;
