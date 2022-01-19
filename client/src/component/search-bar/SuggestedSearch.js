import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

const SuggestedSearch = ({ allUsersArray, searchValue, setSearchValue }) => {
  // shows only names that contain searchValue
  const matchSuggestions = allUsersArray?.filter((suggestion) => {
    return suggestion.displayName
      .toLowerCase()
      .includes(searchValue.toLowerCase());
  });

  // pushes to selected item
  const history = useHistory();

  // use it to avoid the unmounted componenet errro
  const handleClickSearch = (userHandle) => {
    // setSearchValue("");
    history.push(`/${userHandle}`);
  };

  return (
    <SearchList>
      {matchSuggestions.length === 0 ? (
        <NotFound>No users found</NotFound>
      ) : (
        matchSuggestions.map((user) => {
          return (
            <div key={user._id}>
              <ListedItem
                onClick={() => {
                  handleClickSearch(user.handle);
                }}
              >
                <span>
                  <b>
                    {user.displayName.slice(
                      0,
                      user.displayName
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) + searchValue.length
                    )}
                  </b>
                  <span>
                    {user.displayName.slice(
                      user.displayName
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) +
                        searchValue.length,
                      user.displayName.length
                    )}
                    <div>@{user.handle}</div>
                  </span>
                </span>
              </ListedItem>
            </div>
          );
        })
      )}
    </SearchList>
  );
};

const SearchList = styled.ul`
  border-radius: 10px;
  z-index: 100;
  margin-top: 45px;
  padding: 5px;
  background-color: var(--beige-color);
  margin-left: 5px;
  font-size: 15px;
  width: 80%;
  position: absolute;
  box-shadow: 0 5px 5px -4px rgb(0 0 0 / 0.5);
`;

const ListedItem = styled.li`
  padding: 5px;
  &:hover {
    border-radius: 5px;
    cursor: pointer;
    background-color: var(--gold-color);
  }
`;
const NotFound = styled.div`
  padding: 5px;
  font-size: 15px;
  font-weight: 700;
`;

export default SuggestedSearch;
