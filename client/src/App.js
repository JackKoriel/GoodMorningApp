import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import GlobalStyles from "./component/GlobalStyles";
import styled from "styled-components";
import Horoscope from "./component/Horoscope";
import HomeFeed from "./component/HomeFeed";
import Weather from "./component/Weather";
import News from "./component/News";

const App = () => {
  return (
    <>
      {/* <GlobalStyles /> */}
      <Router>
        <MasterContainer>
          {/* <Sidebar /> */}
          <Sections>
            <Switch>
              <Route path="/" exact>
                <HomeFeed />
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
        </MasterContainer>
      </Router>

      {/* Widgest */}
    </>
  );
};

const MasterContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* max-width: 1300px;
  height: 100vh; */
  margin-left: auto;
  margin-right: auto;
`;

const Sections = styled.div`
  /* margin-top: 0px;
  margin-left: 30px; */
  /* border: 5px solid black; */
  /* flex: 2 1; */
  /* border-left: 1px solid var(--twitter-background); */
  /* padding-left: 0px; */
  /* border-right: 1px solid var(--twitter-background); */
  /* margin-right: 50px;
  max-width: 1000px; */
`;

export default App;
