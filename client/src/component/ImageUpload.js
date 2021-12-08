import React, { useState } from "react";
import Axios from "axios";

const ImageUpload = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [inputValue, setInputValue] = useState("");
  // const [imageURL, setImageURL] = useState("");
  // const [imageId, setImageId] = useState(null);
  // const [fileData, setFileData] = useState(null);
  // const [images, setFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  console.log(previewSource);

  const handleChange = (event) => {
    setImageSelected(event.target.files[0]);
    setInputValue(event.target.value);
    if (event.target.files[0]) {
      previewFile(event.target.files[0]);
    } else {
      setPreviewSource("");
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = (ev) => {
    //prevent the page from refreshing after submitting
    ev.preventDefault();
    //use form data to use with axios
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ow8yfkvb");
    //use Axios to send the image to cloudinary
    Axios.post(
      "https://api.cloudinary.com/v1_1/dhj5ncbxs/image/upload",
      formData
    ).then((res) => {
      // console.log(res);
      // setImageURL(res.data.url);
      // setImageId(res.data.asset_id);

      //send the image url and ID to backend
      fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          imageURL: res.data.url,
          imageId: res.data.asset_id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Post", data);
          setInputValue("");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <>
      <form>
        <input
          type="file"
          value={inputValue}
          name="file"
          accept="image/*"
          placeholder="Upload image"
          onChange={(event) => {
            handleChange(event);
          }}
        />
        <button
          type="submit"
          onClick={(ev) => {
            uploadImage(ev);
          }}
        >
          Confirm
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </>
  );
};

export default ImageUpload;
