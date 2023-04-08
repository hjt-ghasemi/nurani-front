import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImagePreview from "./ImagePreview";
import TagsSection from "./ImageTags";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export default function EditImageDialog({
  open,
  setOpen,
  onEdit,
  tags: prevTags,
  imgUrl,
}) {
  const fileInputRef = useRef();
  const [tags, setTags] = useState(prevTags || []);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState(imgUrl);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleClose = () => {
    setOpen(false);
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

  const canSave = () => {
    return tags.length > 0;
  };

  const handleSaveChanges = () => {
    if (!canSave) return;
    setOpen(false);
    onEdit(image, tags);
  };

  return (
    <React.Fragment>
      <Dialog maxWidth="xs" open={open} onClose={handleClose}>
        <DialogContent>
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
            onClick={handleSaveChanges}
            disabled={!canSave()}
          >
            Save Changes
            <FileUploadIcon style={{ marginLeft: 10, marginTop: -3 }} />
          </Button>
        </DialogContent>

        <DialogActions>
          <Button color="error" onClick={handleClose} sx={{ marginLeft: 1 }}>
            Discard changes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
