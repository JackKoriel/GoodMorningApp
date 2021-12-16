import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import { currentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router";
import ErrorMsg from "./ErrorMsg";
import { HeartSpinner } from "react-spinners-kit";

const SignIn = () => {
  let history = useHistory();
  const {
    user,
    actions: { checkingUserStatus },
  } = useContext(currentUserContext);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [readyToPush, setReadyToPush] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && readyToPush) {
      history.push("/");
    }
    return () => {
      isMounted = false;
    };
  }, [readyToPush, history]);

  //error messages validations
  const [subStatus, setSubStatus] = useState("idle");
  const [errMessage, setErrMessage] = useState("");

  const handleChangeUsername = (ev) => {
    setusername(ev.target.value);
    setErrMessage("");
    setSubStatus("idle");
  };
  const handleChangePassword = (ev) => {
    setPassword(ev.target.value);
    setErrMessage("");
    setSubStatus("idle");
  };
  const handleChangeEmail = (ev) => {
    setEmail(ev.target.value);
    setErrMessage("");
    setSubStatus("idle");
  };

  const handleClickShowPassword = (ev) => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setSubStatus("pending");
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
        if (json.status === 200) {
          checkingUserStatus(json.data);
          setSubStatus("idle");
          setReadyToPush(true);
        } else {
          setSubStatus("error");
          setErrMessage(json.message);
          setusername("");
          setEmail("");
          setPassword("");
        }
      });
  };

  if (user.status === "active") {
    return (
      <Progress>
        <HeartSpinner color="var(--blue-color)" />
      </Progress>
    );
  }

  return (
    <Master>
      <SignContainer>
        <TextField
          onChange={(ev) => handleChangeUsername(ev)}
          id="outlined-size-small6"
          placeholder="Your first name"
          variant="outlined"
          style={{ width: "100%", background: "white", borderRadius: "5px" }}
          value={username}
          required
        />
        <OutlinedInput
          required
          onChange={(ev) => handleChangePassword(ev)}
          type={showPassword ? "text" : "password"}
          value={password}
          id="outlined-size-small7"
          placeholder="Your password"
          variant="outlined"
          style={{ width: "100%", background: "white", borderRadius: "5px" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <TextField
          required
          onChange={(ev) => handleChangeEmail(ev)}
          id="outlined-size-small8"
          placeholder="Your email"
          variant="outlined"
          style={{ width: "100%", background: "white", borderRadius: "5px" }}
          value={email}
        />
        <Button onClick={(ev) => handleClick(ev)}>
          {subStatus === "pending" ? (
            <i className="fas fa-ring fa-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
        {subStatus === "error" && <ErrorMsg>{errMessage}</ErrorMsg>}
      </SignContainer>
    </Master>
  );
};

const Master = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-image: url("https://res.cloudinary.com/dhj5ncbxs/image/upload/v1639365072/wp5784428_ryak7y.jpg");
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-size: 20px;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  height: 120px;
`;

const SignContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: var(--beige-color);
  border-radius: 5px;
  padding: 50px;
  border-radius: 10px;
  border: 2px solid var(--gold-color);
  width: 25%;
  height: 25%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const Button = styled.button`
  width: 100%;
  padding: 15px 0;
  color: white;
  background-color: var(--blue-color);
  font-weight: 900;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

export default SignIn;
