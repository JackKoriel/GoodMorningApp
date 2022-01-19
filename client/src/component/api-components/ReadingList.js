import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import { HeartSpinner } from "react-spinners-kit";
import { FiXCircle } from "react-icons/fi";
import { FiBookOpen } from "react-icons/fi";
import { currentUserContext } from "../contexts/CurrentUserContext";
import { PostContext } from "../contexts/PostContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const ReadingList = () => {
  const { update, setUpdate } = useContext(currentUserContext);
  const {
    actions: { clearFeed },
    newsStatus,
    setStart,
  } = useContext(PostContext);
  const [readingList, setReadingList] = useState([]);
  const [status, setStatus] = useState("idle");

  //for pagination
  const [listStatus, setListStatus] = useState("idle");
  const [pageNumber, setPageNumber] = useState(1);
  const [startList, setStartList] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setListStatus("loading");
    let isMounted = true;
    if (isMounted) {
      fetch(`/api/reading-list?start=${startList}&limit=2`)
        .then((res) => res.json())
        .then((data) => {
          setReadingList(data.data);
          setStatus("active");
          setHasMore(data.data.length > 0);
          setListStatus("active");
        })
        .catch((err) => {});
    }
    return () => {
      isMounted = false;
    };
  }, [status, newsStatus, startList]);

  const handleNextPageClick = () => {
    if (hasMore) {
      setPageNumber(pageNumber + 1);
      setStartList(startList + 2);
    }
  };

  const handleLastPageClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
      setStartList(startList - 2);
    }
  };

  // to remove from reading list
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
        //to update homefeed so it doesn't create dupes due to the user update
        setStart(0);
        clearFeed();
      })
      .catch((err) => {});
  };

  // when the reading list is empty
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
          {listStatus === "loading" ? (
            <ReadingLoading>
              <HeartSpinner color="var(--blue-color)" /> Loading...
            </ReadingLoading>
          ) : (
            <>
              {hasMore === false ? (
                <Empty>
                  No articles{" "}
                  <FiBookOpen
                    style={{ marginRight: "10px", marginLeft: "10px" }}
                  />{" "}
                  here 😺
                </Empty>
              ) : (
                <ArticleWrapper>
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
                            onMouseOut={({ target }) =>
                              (target.style.fill = "white")
                            }
                          />
                        </ButtonRemove>
                      </Article>
                    );
                  })}
                </ArticleWrapper>
              )}
            </>
          )}
          <Pages>
            Pages:{" "}
            <ArrowLeft
              onClick={handleLastPageClick}
              onKeyPress={handleLastPageClick}
              tabIndex="0"
            />{" "}
            {pageNumber}{" "}
            <ArrowRight
              onClick={handleNextPageClick}
              onKeyPress={handleNextPageClick}
              tabIndex="0"
            />
          </Pages>
        </MasterContainer>
      )}
    </>
  );
};

const Empty = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  text-align: center;
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

const ReadingLoading = styled.div`
  background-color: var(--beige-color);
  width: 650px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  margin-top: 50%;
`;

const MasterContainer = styled.div`
  position: relative;
  background: var(--beige-color);
  max-width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* overflow: scroll; */
  /* margin: 15px; */
  padding: 20px 0;
  gap: 20px;
  /* text-decoration: none; */
  overflow: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ArticleWrapper = styled.div`
  background: var(--beige-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 90%;
  gap: 10px;
  overflow: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
  border-radius: 10px;
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
  border-radius: 10px;
  margin: 5px 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* padding: 20px 20px; */
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    background: var(--yellow-color);
    border-radius: 10px;
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

const Pages = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  padding: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 20px;
  font-size: 40px;
  z-index: 10;
`;

const ArrowRight = styled(MdArrowForwardIos)`
  cursor: pointer;
`;

const ArrowLeft = styled(MdArrowBackIosNew)`
  cursor: pointer;
  &:disabled {
    filter: grayscale(100%);
  }
  &:disabled {
    cursor: not-allowed;
  }
`;

export default ReadingList;
