import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CurrentUserProvider } from "./component/CurrentUserContext";
import { PostProvider } from "./component/PostContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
