import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SuggestedSearch from "./SuggestedSearch";

const SearchBar = () => {
  // useState for the value inside of search bar
  const [searchValue, setSearchValue] = useState("");
  // stores all items from backend
  const [allUsersArray, setAllUsersArray] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setAllUsersArray(data));
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <>
      <Wrapper>
        <SearchBox
          type="text"
          placeholder="Search for friends here..."
          value={searchValue}
          onChange={(ev) => setSearchValue(ev.target.value)}
        />
        <SearchButton onClick={handleClear}>Clear</SearchButton>
        {searchValue.length >= 2 && (
          <SuggestedSearch
            allUsersArray={allUsersArray.data}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )}
      </Wrapper>
    </>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  margin-top: 3px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const SearchBox = styled.input`
  margin-left: 5px;
  font-size: 20px;
  width: 80%;
  /* margin-right: 5px; */
  border: 1px solid var(--brown-color);
  background-color: var(--gold-color);
  padding: 5px;
  border-radius: 10px;
`;

const SearchButton = styled.button`
  font-size: 20px;
  padding: 3px 20px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  background-color: var(--blue-color);
  color: white;
  margin-right: 5px;
  &:active {
    opacity: 0.8;
  }
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;
