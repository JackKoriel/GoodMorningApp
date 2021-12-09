import React, { createContext, useEffect, useState, useReducer } from "react";

export const currentUserContext = createContext(null);

const initialState = {
  status: "idle",
  handle: null,
  avatarSrc: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "received-user-status": {
      return {
        ...state,
        status: "active",
        _id: action._id,
        handle: action.handle,
        sign: action.sign,
        location: action.location,
        birthDate: action.birthDate,
        avatarSrc: action.avatarSrc,
        bannerSrc: action.bannerSrc,
        joined: action.joined,
        bio: action.bio,
        followingIds: action.followingIds,
        followerIds: action.followerIds,
        likeIds: action.likeIds,
        favorite: action.favorite,
        readingList: action.readingList,
      };
    }
    case "no-user-found": {
      return {
        ...state,
        status: "error",
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const CurrentUserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);
  console.log(user);
  const [errorStatus, setErrorStatus] = useState(false);

  const checkingUserStatus = (data) => {
    dispatch({ type: "received-user-status", ...data });
  };

  const noAvailableUserStatus = () => {
    dispatch({ type: "no-user-found" });
  };

  // fetch user info based on session
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((res) => {
        checkingUserStatus(res.data);
        console.log("res", res);
      })
      .catch((err) => {
        setErrorStatus(true);
        console.log(err);
        noAvailableUserStatus();
      });
  }, []);

  return (
    <currentUserContext.Provider
      value={{ errorStatus, user, actions: { checkingUserStatus } }}
    >
      {children}
    </currentUserContext.Provider>
  );
};
