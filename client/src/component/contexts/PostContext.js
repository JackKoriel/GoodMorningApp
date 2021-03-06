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
  data: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "RECEIVED-POSTS": {
      return {
        ...state,
        statusPost: "active",
        data: [...new Set([...state.data, ...action.data])],
      };
    }
    case "CLEAR-POSTS": {
      return initialState;
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
  const [noPosts, setNoPosts] = useState(false);

  //for the infinite scroll
  const [start, setStart] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  const checkingPosts = (data) => {
    dispatch({ type: "RECEIVED-POSTS", data });
  };

  const clearFeed = () => {
    dispatch({ type: "CLEAR-POSTS" });
  };

  useEffect(() => {
    if (user.status === "active") {
      setLoading(true);
      setLoadingError(false);
      if (user.status === "active") {
        fetch(`/api/${user.handle}/friends-feed?start=${start}&limit=5`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              checkingPosts(data.data);
              setHasMore(data.data.length > 0);
              setLoading(false);
              setNoPosts(false);
            } else {
              setNoPosts(true);
              setLoading(false);
              checkingPosts(data.data);
            }
          })
          .catch((err) => {
            setLoadingError(true);
            setErrorStatus(true);
          });
      }
    }
  }, [isUpdatingPost, user, startLoading]);
  //removed start from depandancy while testing unfollow button

  return (
    <PostContext.Provider
      value={{
        posts,
        actions: { checkingPosts, clearFeed },
        errorStatus,
        isUpdatingPost,
        setIsUpdatingPost,
        modalStatus,
        setModalStatus,
        newsStatus,
        setNewsStatus,
        horoStatus,
        setHoroStatus,
        start,
        setStart,
        loading,
        setLoading,
        loadingError,
        setLoadingError,
        hasMore,
        setHasMore,
        noPosts,
        startLoading,
        setStartLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
