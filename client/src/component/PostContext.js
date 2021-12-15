import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from "react";
import { currentUserContext } from "./CurrentUserContext";

export const PostContext = createContext();

const initialState = {
  statusPost: "idle",
};

function reducer(state, action) {
  switch (action.type) {
    case "received-tweets": {
      return {
        ...state,
        statusPost: "active",
        data: action.data,
      };
    }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const PostProvider = ({ children }) => {
  const { user } = useContext(currentUserContext);
  const [posts, dispatch] = useReducer(reducer, initialState);
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [newsStatus, setNewsStatus] = useState(false);
  const [horoStatus, setHoroStatus] = useState(false);

  const checkingPosts = (data) => {
    dispatch({ type: "received-tweets", data });
  };

  useEffect(() => {
    if (user.status === "active") {
      fetch(`/api/${user.handle}/friends-feed`)
        .then((res) => res.json())
        .then((data) => {
          checkingPosts(data.data);
        })
        .catch((err) => {
          setErrorStatus(true);
          console.log(err);
        });
    }
  }, [isUpdatingPost, user]);

  return (
    <PostContext.Provider
      value={{
        posts,
        actions: { checkingPosts },
        errorStatus,
        isUpdatingPost,
        setIsUpdatingPost,
        modalStatus,
        setModalStatus,
        newsStatus,
        setNewsStatus,
        horoStatus,
        setHoroStatus,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
