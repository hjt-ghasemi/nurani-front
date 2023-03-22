import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddButton = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <AddCircleIcon color="primary" />
  </IconButton>
);

const TagsSection = ({ tags, onAddTag, onDeleteTag }) => {
  const [tagValue, setTagValue] = useState("");

  const handleTagAdd = () => {
    setTagValue("");
    onAddTag(tagValue);
  };

  return (
    <Box sx={{ width: 1, my: 2 }}>
      <TextField
        id="standard-name"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleTagAdd();
        }}
        label="Tag"
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: <AddButton onClick={handleTagAdd} />,
        }}
        value={tagValue}
        onChange={(e) => setTagValue(e.target.value)}
      />
      {tags.map((tag, index) => (
        <Chip
          key={index}
          variant="outlined"
          label={tag}
          color="primary"
          onDelete={() => {
            onDeleteTag(index);
          }}
          sx={{ marginRight: 1, marginBottom: 1 }}
        />
      ))}
    </Box>
  );
};

export default TagsSection;
