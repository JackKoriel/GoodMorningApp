import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import Horoscope from "./component/Horoscope";
import HomeFeed from "./component/HomeFeed";
import Weather from "./component/Weather";
import News from "./component/News";
import GlobalStyles from "./component/GlobalStyles";
import SideNavbar from "./component/SideNavbar";
import Profile from "./component/Profile";
import ReadingList from "./component/ReadingList";
import Favorite from "./component/Favorite";
import Widgets from "./component/Widgets";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import LogOut from "./component/LogOut";
import Settings from "./component/Settings";
import PostDetails from "./component/PostDetails";
import { currentUserContext } from "./component/CurrentUserContext";
import CircularProgress from "@mui/material/CircularProgress";
import ChatSys from "./component/chat-page/ChatSys";
import ChatRooms from "./component/chat-page/ChatRooms";

const App = () => {
  const { user } = useContext(currentUserContext);

  return (
    <>
      <GlobalStyles />
      {user.status === "loading" ? (
        <Progress>
          <CircularProgress /> Loading...
        </Progress>
      ) : (
        <>
          <Router>
            <MasterContainer>
              {user.status === "active" && <SideNavbar />}
              <Switch>
                <Route path="/" exact>
                  {user.status === "idle" ? (
                    <Redirect to="/signup" />
                  ) : (
                    <HomeFeed />
                  )}
                </Route>
                <Route path="/signin">
                  {user.status === "active" ? <Redirect to="/" /> : <SignIn />}
                </Route>
                <Route path="/signup">
                  <SignUp />
                </Route>
                <Route path="/logout">
                  <LogOut />
                </Route>
                <Route path="/chat/:roomId">
                  <ChatSys />
                </Route>
                <Route path="/chats-list/">
                  <ChatRooms />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route path="/favorite">
                  <Favorite />
                </Route>
                <Route path="/reading-list">
                  <ReadingList />
                </Route>
                <Route path="/post/:postId">
                  <PostDetails />
                </Route>
                <Route path="/:handle">
                  <Profile />
                </Route>

                <Route path="/horoscope">
                  <Horoscope />
                </Route>
                <Route path="/weather">
                  <Weather />
                </Route>
                <Route path="/news">
                  <News />
                </Route>
              </Switch>
              {/* Widgest */}
              {user.status === "active" && <Widgets />}
            </MasterContainer>
          </Router>
        </>
      )}
    </>
  );
};

const MasterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  /* max-width: 1500px; */
  height: 100vh;
  /* width: 100vw; */
  margin-left: auto;
  margin-right: auto;
  /* padding: 0 10px; */
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  /* background-color: var(--lightBlue-color); */
`;

const Progress = styled.div`
  display: flex;
  width: 700px;
  height: 100vh;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(50% - (40% / 2));
  background-color: var(--beige-color);
`;

export default App;
