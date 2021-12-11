import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import GlobalStyles from "./component/GlobalStyles";
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
import PostDetails from "./component/PostDetails";
// import PostModal from "./component/PostModal";
import { currentUserContext } from "./component/CurrentUserContext";
import { PostContext } from "./component/PostContext";

const App = () => {
  const { user } = useContext(currentUserContext);
  const { posts } = useContext(PostContext);
  // console.log(posts);
  return (
    <>
      <GlobalStyles />
      <Router>
        <MasterContainer>
          {user.status === "active" && <SideNavbar />}
          <Sections>
            <Switch>
              <Route path="/" exact>
                {user.status === "idle" ? (
                  <Redirect to="/signin" />
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
              <Route path="/favorite">
                <Favorite />
              </Route>
              <Route path="/reading-list">
                <ReadingList />
              </Route>
              <Route path="/post/:postId">
                <PostDetails />
              </Route>
              <Route path="/:profileId">
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
          </Sections>
          {/* Widgest */}
          {user.status === "active" && <Widgets />}
        </MasterContainer>
      </Router>
    </>
  );
};

const MasterContainer = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1500px;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;
`;

const Sections = styled.div`
  /* border: 5px solid black; */
  margin-top: 0px;
  /* margin-left: 30px; */
  flex: 0.7;
  border-left: 1px solid var(--twitter-background);
  padding-left: 0px;
  border-right: 1px solid var(--twitter-background);
  margin-right: 10px;
  max-width: 700px;
`;

export default App;
