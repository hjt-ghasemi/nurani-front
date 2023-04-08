import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ImageTags from "./ImageTags";
import ImagePreview from "./ImagePreview";
import imageService from "../services/imageService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { beginLoading, endLoading } from "../store/ui";
import { changeImagesFetchRequired } from "../store/images";

const UploadImageForm = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const handleUpload = async () => {
    if (!canUpload()) return;
    try {
      dispatch(beginLoading);
      await imageService.upload(image, tags);
      dispatch(changeImagesFetchRequired);
      toast.success("Image uploaded successfully.");
      setTags([]);
      setImage(null);
      setPreview(null);
    } catch (ex) {
      const { message, errors } = ex.response.data;
      const error = (errors && (errors.image[0] || errors.tags[0])) || message;
      setTags([]);
      setImage(null);
      setPreview(null);
      toast.error(error);
    } finally {
      dispatch(endLoading);
    }
  };

  const handleClickSelectImage = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleAddTag = (tagValue) => {
    if (!tags.includes(tagValue) && tagValue.trim() !== "")
      setTags([...tags, tagValue]);
  };

  const handleDeleteTag = (index) => {
    setTags(tags.filter((tag, idx) => idx !== index));
  };

  const canUpload = () => {
    return Boolean(image && tags.length);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 400,
          mx: "auto",
        }}
      >
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => {
            e.preventDefault();
            const file = e.target.files[0];
            if (file && file.type.substring(0, 5) === "image") {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2, letterSpacing: "1px" }}
          onClick={handleClickSelectImage}
        >
          Select Image
          <AddPhotoAlternateIcon style={{ marginLeft: 10, marginTop: -3 }} />
        </Button>
        {preview && <ImagePreview preview={preview} />}
        <ImageTags
          tags={tags}
          onAddTag={handleAddTag}
          onDeleteTag={handleDeleteTag}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2, letterSpacing: "1px" }}
          onClick={handleUpload}
          disabled={!canUpload()}
        >
          Upload Image
          <FileUploadIcon style={{ marginLeft: 10, marginTop: -3 }} />
        </Button>
      </Box>
    </Container>
  );
};

export default UploadImageForm;
