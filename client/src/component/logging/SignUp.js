import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import SuneriseLogo from "../navbar/SuneriseLogo";
import Axios from "axios";
import { useHistory } from "react-router";
import ErrorMsg from "../helpers/ErrorMsg";

const SignUp = () => {
  let history = useHistory();
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [sign, setSign] = useState("");

  //images states
  const [avatarInputValue, setAvatarInputValue] = useState("");
  const [bannerInputValue, setBannerInputValue] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [bannerURL, setBannerURL] = useState("");

  //submit button states
  const [avatarState, setAvatarState] = useState(true);
  const [bannerState, setBannerState] = useState(true);

  const horoscpes = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  //error messages validations
  const [subStatus, setSubStatus] = useState("idle");
  const [errMessage, setErrMessage] = useState("");

  const [readyToPush, setReadyToPush] = useState(false);
  useEffect(() => {
    if (readyToPush === true) {
      history.push("/signin");
    }
  }, [readyToPush, history]);

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
  const handleChangeDisplayName = (ev) => {
    setDisplayName(ev.target.value);
    setErrMessage("");
    setSubStatus("idle");
  };
  const handleChangeCity = (ev) => {
    setCity(ev.target.value);
    setErrMessage("");
    setSubStatus("idle");
  };
  const handleChangeCountry = (ev) => {
    setCountry(ev.target.value);
    setErrMessage("");
    setSubStatus("idle");
  };
  const handleChangeSign = (ev) => {
    setSign(ev.target.value);
    setErrMessage("");
    setSubStatus("idle");
  };

  const handleClickShowPassword = (ev) => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickSignin = () => {
    history.push("/signin");
  };

  //when user selects avatar
  const handleAvatarChange = (event) => {
    //set the button state so the user doesn't submit before the URL is returned
    setAvatarInputValue(event.target.value);

    //use form data for banner to use with axios
    const formDataAvatar = new FormData();
    formDataAvatar.append("file", event.target.files[0]);
    formDataAvatar.append("upload_preset", "ow8yfkvb");

    //use Axios to send the image to cloudinary
    if (event.target.files[0] !== undefined) {
      setAvatarState(false);
      Axios.post(
        "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",
        formDataAvatar
      ).then((res) => {
        setAvatarURL(res.data.url);
        setAvatarState(true);
      });
    }
  };

  //when user selects banner
  const handleBannerChange = (event) => {
    //set the button state so the user doesn't submit before the URL is returned
    setBannerInputValue(event.target.value);

    //use form data for banner to use with axios
    const formDataBanner = new FormData();
    formDataBanner.append("file", event.target.files[0]);
    formDataBanner.append("upload_preset", "ow8yfkvb");

    //use Axios to send the image to cloudinary
    if (event.target.files[0] !== undefined) {
      setBannerState(false);
      Axios.post(
        "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",

        formDataBanner
      ).then((res) => {
        setBannerURL(res.data.url);
        setBannerState(true);
      });
    }
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    //set the button state for the loading animations
    setSubStatus("pending");

    fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        handle: username,
        password,
        email,
        displayName,
        city,
        sign,
        country,
        avatarSrc: avatarURL,
        bannerSrc: bannerURL,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 201) {
          setSubStatus("idle");
          setReadyToPush(true);
        } else {
          setSubStatus("error");
          setErrMessage(json.message);
        }
      });
  };

  return (
    <Master>
      <Background src="https://res.cloudinary.com/dhj5ncbxs/image/upload/v1639348302/1165336_krjkkd.jpg" />
      <SignContainer>
        <div
          style={{
            marginTop: "-150px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SuneriseLogo />
          <h2 style={{ marginBottom: "10px" }}>
            Join the Good Morning Web App today and share your mood with your
            friends
          </h2>
          <div
            style={{
              width: "100%",
              gap: "5px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TextField
              onChange={(ev) => handleChangeUsername(ev)}
              id="outlined-size-small9"
              placeholder="Your username name"
              variant="outlined"
              style={{
                width: "100%",
                background: "white",
                borderRadius: "5px",
              }}
              value={username}
            />
            <TextField
              onChange={(ev) => handleChangeDisplayName(ev)}
              id="outlined-size-small10"
              placeholder="Your full name"
              variant="outlined"
              style={{
                width: "100%",
                background: "white",
                borderRadius: "5px",
              }}
              value={displayName}
            />
          </div>
          <OutlinedInput
            onChange={(ev) => handleChangePassword(ev)}
            type={showPassword ? "text" : "password"}
            value={password}
            id="outlined-adornment-password"
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
            onChange={(ev) => handleChangeEmail(ev)}
            id="outlined-size-small11"
            placeholder="Your email"
            variant="outlined"
            style={{ width: "100%", background: "white", borderRadius: "5px" }}
            value={email}
          />
          <div
            style={{
              width: "100%",
              gap: "5px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TextField
              onChange={(ev) => handleChangeCity(ev)}
              id="outlined-size-small12"
              placeholder="City eg. Montreal"
              variant="outlined"
              style={{
                width: "100%",
                background: "white",
                borderRadius: "5px",
              }}
              value={city}
            />
            <TextField
              onChange={(ev) => handleChangeCountry(ev)}
              id="outlined-size-small13"
              placeholder="Country code, eg. CA for Canada"
              variant="outlined"
              style={{
                width: "100%",
                background: "white",
                borderRadius: "5px",
              }}
              value={country}
            />
          </div>
          <select
            onMouseOver={({ target }) => (
              (target.style.cursor = "pointer"), (target.style.opacity = "0.8")
            )}
            onMouseOut={({ target }) => (target.style.opacity = "1")}
            onFocus={({ target }) =>
              (target.style.border = "2px solid #2196F3")
            }
            onBlur={({ target }) =>
              (target.style.border = "1px solid lightgray")
            }
            variant="outlined"
            id="simple-select"
            value={sign}
            onChange={(ev) => handleChangeSign(ev)}
            style={SelectStyle}
          >
            <option value="" disabled hidden>
              Choose your zodiac sign
            </option>
            {horoscpes.map((horosope, index) => {
              return (
                <option key={index} value={horosope}>
                  {horosope}
                </option>
              );
            })}
          </select>
          <div
            style={{
              width: "100%",
              gap: "5px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <AvatarInput>
              <label htmlFor="file-upload-avatar" style={lableStyle}>
                {avatarInputValue ? avatarInputValue : "Choose an avatar image"}
              </label>
              <input
                style={{ display: "none" }}
                id="file-upload-avatar"
                type="file"
                value={avatarInputValue}
                name="file"
                accept="image/*"
                placeholder="Upload image"
                onChange={(event) => {
                  handleAvatarChange(event);
                }}
              />
            </AvatarInput>
            <BannerInput>
              <label htmlFor="file-upload-banner" style={lableStyle}>
                {bannerInputValue ? bannerInputValue : "Choose a banner image"}
              </label>
              <input
                style={{ display: "none" }}
                id="file-upload-banner"
                type="file"
                value={bannerInputValue}
                name="file"
                accept="image/*"
                placeholder="Upload image"
                onChange={(event) => {
                  handleBannerChange(event);
                }}
              />
            </BannerInput>
          </div>
          <Button onClick={(ev) => handleClick(ev)}>
            {!avatarState || !bannerState || subStatus === "pending" ? (
              <i className="fas fa-ring fa-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        <div style={{ marginTop: "25px", position: "relative" }}>
          <h3>Already have an account?</h3>
          <Button onClick={handleClickSignin}>Sign in</Button>
          {subStatus === "error" && <ErrorMsg>{errMessage}</ErrorMsg>}
        </div>
      </SignContainer>
    </Master>
  );
};

const Master = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  flex-direction: row;
  justify-content: center;
  /* flex: 0.5; */
  @media (max-width: 820px) {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    width: 100vw;
  }
`;
const Background = styled.img`
  z-index: 1;
  max-width: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: 820px) {
    max-height: 0%;
  }
`;
const SignContainer = styled.div`
  /* width: 100%; */
  border-left: 2px solid var(--gold-color);
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: var(--beige-color);
  padding: 2% 2%;
  @media (max-width: 820px) {
    max-width: 100%;
    height: 100%;
  }
`;

const AvatarInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 15px 0;
  font-size: 15px;
  border: 1px solid lightgray;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    /* border-radius: 5px; */
  }
`;

const BannerInput = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: white;
  border-radius: 5px;
  padding: 15px 0;
  font-size: 15px;
  border: 1px solid lightgray;
  transition: all 300ms ease-out;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
    /* border-radius: 5px; */
  }
`;

const lableStyle = {
  width: "100%",
  height: "100%",
  cursor: "pointer",
  paddingLeft: "15px",
};

const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 15px 0;
  color: white;
  background-color: var(--blue-color);
  font-weight: 900;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const SelectStyle = {
  width: "100%",
  background: "white",
  borderRadius: "5px",
  padding: "15px 10px",
  fontSize: "15px",
  border: "1px solid lightgray",
};

export default SignUp;
