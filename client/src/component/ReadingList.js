import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { HeartSpinner } from "react-spinners-kit";
import { FiXCircle } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";
import { currentUserContext } from "./CurrentUserContext";
import { PostContext } from "./PostContext";

const ReadingList = () => {
  const { update, setUpdate } = useContext(currentUserContext);
  const { newsStatus } = useContext(PostContext);
  const [readingList, setReadingList] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    fetch(`/api/reading-list`)
      .then((res) => res.json())
      .then((data) => {
        setReadingList(data.data);
        setStatus("active");
      })
      .catch((err) => {});
  }, [status, newsStatus]);

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
        setUpdate(!update);
      })
      .catch((err) => {});
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
          <HeartSpinner color="var(--blue-color)" /> Loading...
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
                    onMouseOver={({ target }) =>
                      (target.style.fill = "var(--blue-color)")
                    }
                    onMouseOut={({ target }) => (target.style.fill = "white")}
                  />
                </ButtonRemove>
              </Article>
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
  width: 700px;
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
  height: auto;
  display: flex;
  flex-direction: column;
  /* overflow: scroll; */
  padding: 20px 10px;
  /* margin: 15px; */
  gap: 20px;
  /* text-decoration: none; */
  overflow: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Article = styled.a`
  position: relative;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid var(--yellow-color);
  justify-content: center;
  align-items: center;
  transition: all 300ms ease-out;
  border-radius: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  padding: 5px 5px;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    background: var(--yellow-color);
    border-radius: 20px;
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
