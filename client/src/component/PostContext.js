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
  // console.log(action.tweetsById);
  //   console.log(action.data);
  //   console.log(state.tweetId);
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
  console.log(posts);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [newsStatus, setNewsStatus] = useState(false);
  const [horoStatus, setHoroStatus] = useState(false);

  const checkingPosts = (data) => {
    dispatch({ type: "received-tweets", data });
  };

  useEffect(() => {
    if (user.status === "active") {
      //   console.log(user);
      fetch(`/api/${user.handle}/friends-feed`)
        .then((res) => res.json())
        .then((data) => {
          checkingPosts(data.data);
          //   console.log(data);
        })
        .catch((err) => {
          setErrorStatus(true);
          console.log(err);
        });
    }
  }, [user]);

  return (
    <PostContext.Provider
      value={{
        posts,
        actions: { checkingPosts },
        errorStatus,
        isUpdating,
        setIsUpdating,
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
