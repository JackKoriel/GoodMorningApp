import React, { createContext, useEffect, useState, useReducer } from "react";

export const currentUserContext = createContext(null);

const initialState = {
  status: "loading",
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
        email: action.email,
        handle: action.handle,
        displayName: action.displayName,
        sign: action.sign,
        country: action.country,
        city: action.city,
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
        status: "idle",
      };
    }
    case "log-out": {
      return {
        ...initialState,
        status: "idle",
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const CurrentUserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, initialState);

  const [errorStatus, setErrorStatus] = useState(false);
  const [update, setUpdate] = useState(false);

  const checkingUserStatus = (data) => {
    dispatch({ type: "received-user-status", ...data });
  };

  const noAvailableUserStatus = () => {
    dispatch({ type: "no-user-found" });
  };

  const logoutUserStatus = () => {
    dispatch({ type: "log-out" });
  };

  // fetch user info based on session
  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          checkingUserStatus(res.data);
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        setErrorStatus(true);
        console.log(err);
        noAvailableUserStatus();
      });
  }, [update]);

  return (
    <currentUserContext.Provider
      value={{
        errorStatus,
        user,
        actions: { checkingUserStatus, logoutUserStatus },
        update,
        setUpdate,
      }}
    >
      {children}
    </currentUserContext.Provider>
  );
};
