import React, { useState } from "react";
import styled from "styled-components";
// import Navbar from "./Navbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
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
// import { UserContext } from "./UserContext";

const SignUp = () => {
  let history = useHistory();
  //   let history = useHistory();
  //   const { setUserNow } = useContext(UserContext);
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

  const handleClickSignin = () => {
    history.push("/signin");
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
            if (jsonP.status === 201) {
              history.push("/signin");
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
    <Master>
      <Background src="https://res.cloudinary.com/dhj5ncbxs/image/upload/v1639348302/1165336_krjkkd.jpg" />
      <SignContainer>
        <SuneriseLogo style={{ marginTop: "25px" }} />
        <h1>
          Join the Good Morning Web App today and share your mood with your
          friends
        </h1>
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
          Submit
          {/* )} */}
        </Button>
        <div style={{ marginTop: "25px" }}>
          <h3>Already have an account?</h3>
          <Button onClick={handleClickSignin}>Sign in</Button>
        </div>
      </SignContainer>
      {/* {subStatus === "error" && <ErrorMsg>{errMessage}</ErrorMsg>} */}
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
`;
const Background = styled.img`
  z-index: 1;
  max-width: 50%;
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

const ErrorMsg = styled.div`
  display: flex;
  position: absolute;
  margin-top: 300px;
  color: var(--blue-color);
  background: white;
  border: 4px solid var(--blue-color);
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
export default SignUp;
