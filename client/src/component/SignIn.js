import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
// import Navbar from "./Navbar";
import TextField from "@material-ui/core/TextField";
// import backgroundImage from "../Images/facespace_bg.jpg";
import { currentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router";

const SignIn = () => {
  let history = useHistory();
  const { user } = useContext(currentUserContext);

  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user.status === "active") {
      history.push("/");
    }
  }, [user.status]);

  //   const [subStatus, setSubStatus] = useState("idle");
  //   const [errMessage, setErrMessage] = useState("");

  // console.log(subStatus);

  const handleChangeUsername = (ev) => {
    // console.log(ev.target.value);
    setusername(ev.target.value);
    // setErrMessage("");
    // setSubStatus("idle");
  };
  const handleChangePassword = (ev) => {
    // console.log(ev.target.value);
    setPassword(ev.target.value);
    // setErrMessage("");
    // setSubStatus("idle");
  };
  const handleChangeEmail = (ev) => {
    // console.log(ev.target.value);
    setEmail(ev.target.value);
    // setErrMessage("");
    // setSubStatus("idle");
  };

  const handleClick = (ev) => {
    // console.log("usename", username);
    ev.preventDefault();
    // setSubStatus("pending");
    fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({
        handle: username,
        password: password,
        email: email,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json.user[0]);
        // const { status, error } = json;
        // if (status === "success") {
        //   window.sessionStorage.setItem(
        //     "username",
        //     JSON.stringify(json.user[0])
        //   );
        //   //using the json data is better than getting the data from the session because the session stops other functions and therefore it will not display the name next to the greeting without a refresh
        //   setUserNow(json.user[0]);
        //   setSubStatus("confirmed");
        //   //use history to direct the user to the homepage
        //   history.push("/");
        // } else if (error) {
        //   setSubStatus("error");
        //   setErrMessage("Incorrect username");
        //   setusername("");
        // }
      });
  };
  if (user.status === "active") {
    return <div>Loading</div>;
  }
  return (
    <>
      {/* <Navbar /> */}
      <Master>
        {/* <Background src={backgroundImage} /> */}
        <SignContainer>
          <TextField
            onChange={(ev) => handleChangeUsername(ev)}
            id="outlined-size-small"
            placeholder="Your first name"
            variant="outlined"
            style={{ width: "100%", background: "white", borderRadius: "5px" }}
            value={username}
          />
          <TextField
            onChange={(ev) => handleChangePassword(ev)}
            id="outlined-size-small"
            placeholder="Your password"
            variant="outlined"
            type="password"
            style={{ width: "100%", background: "white", borderRadius: "5px" }}
            value={password}
          />
          <TextField
            onChange={(ev) => handleChangeEmail(ev)}
            id="outlined-size-small"
            placeholder="Your email"
            variant="outlined"
            style={{ width: "100%", background: "white", borderRadius: "5px" }}
            value={email}
          />
          <Button onClick={(ev) => handleClick(ev)}>
            {/* {subStatus === "pending" ? (
              <i className="fa fa-circle-o-notch fa-spin" />
            ) : ( */}
            "Submit"
            {/* )} */}
          </Button>
        </SignContainer>
        {/* {subStatus === "error" && <ErrorMsg>{errMessage}</ErrorMsg>} */}
      </Master>
    </>
  );
};

const Master = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 100vh;
`;
const Background = styled.img`
  width: 100%;
  height: auto;
  z-index: -100;
`;
const SignContainer = styled.div`
  position: absolute;
  /* margin-top: -700px; */
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 30px;
  width: 350px;
  height: 150px;
  gap: 5px;
  /* border: 1px red solid; */
  background-color: rgb(220, 220, 220, 0.5);
  border-radius: 5px;
`;
const Button = styled.button`
  width: 100%;
  padding: 15px 0;
  color: white;
  background-color: var(--primary-color);
  font-weight: 900;
  font-size: 23;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const ErrorMsg = styled.div`
  display: flex;
  position: absolute;
  margin-top: 300px;
  color: var(--primary-color);
  background: white;
  border: 4px solid var(--primary-color);
  text-align: center;
  justify-content: center;
  align-items: center;
  /* border: none; */
  padding: 20 px;
  width: 250px;
  height: 70px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 900;
  font-family: var(--heading-font-family);
`;
export default SignIn;
