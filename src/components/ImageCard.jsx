import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import DeleteImageDialog from "./DeleteImageDialog";
import EditImageDialog from "./EditImageDialog";

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));

const Tag = styled(Chip)(() => ({
  marginRight: "10px",
  marginBottom: "7px",
  opacity: "0.8",
}));

const ImageCard = ({ id, imgUrl, tags, onDelete, onEdit }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  return (
    <Box sx={{ boxShadow: 4, mb: 4, backgroundColor: "#fafafa" }}>
      <Grid container>
        <Grid item xs={12} md={5}>
          <Box sx={{ height: "200px" }}>
            <Image alt="" src={imgUrl} />
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              height: "200px",
              padding: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ flex: 1, overflow: "hidden" }}>
              {tags &&
                tags.map((tag, idx) => (
                  <Tag key={idx} color="primary" label={tag} />
                ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                paddingTop: 1,
                borderTop: "1px solid #ddd",
              }}
            >
              <Button
                color="primary"
                size="small"
                sx={{ marginLeft: "auto" }}
                onClick={() => setOpenEditDialog(true)}
                variant="outlined"
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                sx={{ marginLeft: 1 }}
                onClick={() => setOpenDeleteDialog(true)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <DeleteImageDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        onDelete={onDelete}
      />
      <EditImageDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onEdit={(image, tags) => onEdit(id, image, tags)}
        tags={tags}
        imgUrl={imgUrl}
      />
    </Box>
  );
};

export default ImageCard;
