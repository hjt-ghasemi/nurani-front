import React from "react";
import Box from "@mui/material/Box";

const ImagePreview = ({ preview }) => {
  return (
    <Box sx={{ w: 1 }}>
      <img
        src={preview}
        alt=""
        style={{ margin: "auto", maxWidth: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default ImagePreview;
