import React, { useState, useContext } from "react";
import styled from "styled-components";
import { currentUserContext } from "../contexts/CurrentUserContext";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Axios from "axios";
import ErrorMsg from "../helpers/ErrorMsg";

const Settings = () => {
  const {
    user: { _id },
    update,
    setUpdate,
  } = useContext(currentUserContext);
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
  const [confirmState, setConfirmState] = useState(true);

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

  //done message state
  const [userUpdated, setUserUpdated] = useState(false);

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

  //when user selects avatar
  const handleAvatarChange = (event) => {
    //set the button state so the user doesn't submit before the URL is returned
    setAvatarState(false);
    setAvatarInputValue(event.target.value);

    //use form data for banner to use with axios
    const formDataAvatar = new FormData();
    formDataAvatar.append("file", event.target.files[0]);
    formDataAvatar.append("upload_preset", "ow8yfkvb");

    //use Axios to send the image to cloudinary
    Axios.post(
      "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",
      formDataAvatar
    ).then((res) => {
      setAvatarURL(res.data.url);
      setAvatarState(true);
    });
  };

  //when user selects banner
  const handleBannerChange = (event) => {
    //set the button state so the user doesn't submit before the URL is returned
    setBannerState(false);
    setBannerInputValue(event.target.value);

    //use form data for banner to use with axios
    const formDataBanner = new FormData();
    formDataBanner.append("file", event.target.files[0]);
    formDataBanner.append("upload_preset", "ow8yfkvb");

    //use Axios to send the image to cloudinary
    Axios.post(
      "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",

      formDataBanner
    ).then((res) => {
      setBannerURL(res.data.url);
      setBannerState(true);
    });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    //set the button state for the loading animations
    setConfirmState(false);
    setSubStatus("pending");

    fetch(`/api/profile/${_id}`, {
      method: "POST",
      body: JSON.stringify({
        handle: username.toLocaleLowerCase(),
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
        if (json.status === 200) {
          setUpdate(!update);
          setConfirmState(true);
          setSubStatus("idle");
          setUserUpdated(true);
        } else {
          setSubStatus("error");
          setErrMessage(json.message);
          setConfirmState(true);
        }
      });
  };

  return (
    <MasterContainer>
      <Header>
        <h1>Edit profile information:</h1>
      </Header>
      <SignContainer>
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
            id="outlined-size-small1"
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
            id="outlined-size-small2"
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
          id="outlined-size-small3"
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
            id="outlined-size-small4"
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
            id="outlined-size-small5"
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
          onFocus={({ target }) => (target.style.border = "2px solid #2196F3")}
          onBlur={({ target }) => (target.style.border = "1px solid lightgray")}
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
        <Button
          disabled={!avatarState || !bannerState || !confirmState}
          type="submit"
          onClick={(ev) => handleClick(ev)}
        >
          {!avatarState || !bannerState || !confirmState ? (
            <i className="fas fa-cog fa-spin" />
          ) : (
            "Confirm"
          )}
        </Button>
        {subStatus === "error" && <ErrorMsg>{errMessage}</ErrorMsg>}
        {userUpdated === true && (
          <ConfirmMessage>Settings have been updated!</ConfirmMessage>
        )}
      </SignContainer>
    </MasterContainer>
  );
};

const MasterContainer = styled.div`
  background: var(--beige-color);
  max-width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  overflow: scroll;
  -ms-overflow-style: none; /*for IE*/
  scrollbar-width: none; /*for Firefox*/
  /*for Chrome*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  font-size: 20px;
  font-weight: 900;
  margin-left: 20px;
  margin-top: 50px;
`;
const SignContainer = styled.div`
  /* width: 100%; */
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: var(--beige-color);
  padding: 50px 100px;
  @media screen and (max-width: 600px) {
    padding: 30px 30px;
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

const SelectStyle = {
  width: "100%",
  background: "white",
  borderRadius: "5px",
  padding: "15px 10px",
  fontSize: "15px",
  border: "1px solid lightgray",
};

const ConfirmMessage = styled.div`
  position: absolute;
  bottom: -100px;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  border: 2px solid green;
  border-radius: 10px;
  height: 75px;
  width: fit-content;
  padding: 0 25px;
  justify-content: center;
  align-items: center;
  color: green;
  font-weight: 700;
  font-size: 14px;
  background-color: var(--beige-color);
  z-index: 10;
`;

const Button = styled.button`
  margin-top: 40px;
  background-color: var(--blue-color);
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: white;
  display: flex;
  font-family: ui-sans-serif, system-ui, -apple-system, system-ui, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 100%;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &&:focus {
    outline: 0;
  }
  &&:hover:after {
    bottom: 2px;
    left: 2px;
  }
  &&:after {
    content: "";
    position: absolute;
    border: 1px solid #000000;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }
  cursor: ${({ disabled }) => {
    return disabled && "no-drop";
  }};
`;

export default Settings;
