import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { currentUserContext } from "./CurrentUserContext";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import SuneriseLogo from "./SuneriseLogo";
import Horoscope from "./Horoscope";
import { GiRayGun } from "react-icons/gi";
import Axios from "axios";
import { useHistory } from "react-router";

const Settings = () => {
  let history = useHistory();
  const {
    user: { _id, handle },
    update,
    setUpdate,
  } = useContext(currentUserContext);
  // console.log(_id);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [sign, setSign] = useState("");

  //images states
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [avatarInputValue, setAvatarInputValue] = useState("");
  const [bannerSrc, setBannerSrc] = useState(null);
  const [bannerInputValue, setBannerInputValue] = useState("");

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

  //   const [subStatus, setSubStatus] = useState("idle");
  //   const [errMessage, setErrMessage] = useState("");

  // console.log(subStatus);

  //when user selects avatar
  const handleAvatarChange = (event) => {
    setAvatarSrc(event.target.files[0]);
    setAvatarInputValue(event.target.value);
  };
  //when user selects banner
  const handleBannerChange = (event) => {
    setBannerSrc(event.target.files[0]);
    setBannerInputValue(event.target.value);
  };

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
  const handleChangeDisplayName = (ev) => {
    // console.log(ev.target.value);
    setDisplayName(ev.target.value);
    // setErrMessage("");
    // setSubStatus("idle");
  };
  const handleChangeCity = (ev) => {
    // console.log(ev.target.value);
    setCity(ev.target.value);
    // setErrMessage("");
    // setSubStatus("idle");
  };
  const handleChangeCountry = (ev) => {
    // console.log(ev.target.value);
    setCountry(ev.target.value);
    // setErrMessage("");
    // setSubStatus("idle");
  };
  const handleChangeSign = (ev) => {
    // console.log(ev.target.value);
    setSign(ev.target.value);
    // setErrMessage("");
    // setSubStatus("idle");
  };

  const handleClickShowPassword = (ev) => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClick = (ev) => {
    // console.log("usename", username);
    ev.preventDefault();
    // setSubStatus("pending");

    //use form data for avatar to use with axios
    const formDataAvatar = new FormData();
    formDataAvatar.append("file", avatarSrc);
    formDataAvatar.append("upload_preset", "ow8yfkvb");
    //use form data for banner to use with axios
    const formDataBanner = new FormData();
    formDataBanner.append("file", bannerSrc);
    formDataBanner.append("upload_preset", "ow8yfkvb");
    //use Axios to send the image to cloudinary
    Axios.post(
      "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",
      formDataAvatar
    ).then((res) => {
      Axios.post(
        "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",

        formDataBanner
      ).then((json) => {
        // console.log("files from couldinary ", res, json);

        fetch(`/api/profile/${_id}`, {
          method: "POST",
          body: JSON.stringify({
            handle: username,
            password,
            email,
            displayName,
            city,
            sign,
            country,
            avatarSrc: res.data.url,
            bannerSrc: json.data.url,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((resP) => resP.json())
          .then((jsonP) => {
            console.log(jsonP.data);
            if (jsonP.status === 200) {
              setUpdate(!update);
              history.push(`/${handle}`);
            }
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
            //////////////////
          });
        /////////////////
        // .catch((err) => {
        //   // setPostStatusError(true);
        //   console.log(err);
        // });
      });
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
            id="outlined-size-small"
            placeholder="Your username name"
            variant="outlined"
            style={{ width: "100%", background: "white", borderRadius: "5px" }}
            value={username}
          />
          <TextField
            onChange={(ev) => handleChangeDisplayName(ev)}
            id="outlined-size-small"
            placeholder="Your full name"
            variant="outlined"
            style={{ width: "100%", background: "white", borderRadius: "5px" }}
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
          id="outlined-size-small"
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
            id="outlined-size-small"
            placeholder="City eg. Montreal"
            variant="outlined"
            style={{ width: "100%", background: "white", borderRadius: "5px" }}
            value={city}
          />
          <TextField
            onChange={(ev) => handleChangeCountry(ev)}
            id="outlined-size-small"
            placeholder="Country code, eg. CA for Canada"
            variant="outlined"
            style={{ width: "100%", background: "white", borderRadius: "5px" }}
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
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sign}
          // placeholder="Choose your zodiac sign"
          onChange={(ev) => handleChangeSign(ev)}
          style={SelectStyle}
        >
          <option value="" disabled selected hidden>
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
            <label for="file-upload-avatar" style={lableStyle}>
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
            <label for="file-upload-banner" style={lableStyle}>
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
          {/* {subStatus === "pending" ? (
              <i className="fa fa-circle-o-notch fa-spin" />
            ) : ( */}
          Confirm
          {/* )} */}
        </Button>
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
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: var(--beige-color);
  padding: 50px 100px;
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
`;

export default Settings;
