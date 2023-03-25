import React, { useContext, useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TagsSection from "./tagsSection";
import ImagePreview from "./imagePreview";
import imageService from "./../services/imageService";
import { toast } from "react-toastify";
import { LoadingContext } from "../contexts";

const UploadImage = () => {
  const fileInputRef = useRef();
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const { setLoading } = useContext(LoadingContext);

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
    setLoading(true);
    try {
      await imageService.upload(image, tags);
      toast.success("Image uploaded successfully.");
      setTags([]);
      setImage(null);
      setPreview(null);
    } catch (ex) {
      const { message, errors } = ex.response.data;
      const error = (errors && (errors.image[0] || errors.tags[0])) || message;
      toast.error(error);
    }
    setLoading(false);
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
        <TagsSection
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

export default UploadImage;
