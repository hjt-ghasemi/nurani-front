import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import contentService from "../services/contentService";
import { toast } from "react-toastify";

let initialState = { dua: "", wellcome: "" };

const EditContent = () => {
  const [duaContent, setDuaContent] = useState("");
  const [wlcomeContent, setWlcomeContent] = useState("");
  const [bool, forceRender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await contentService.getContent();
      initialState = data;
      setDuaContent(data.dua);
      setWlcomeContent(data.wellcome);
    };

    fetchData();
  }, []);

  const isChanged = () => {
    return (
      initialState.dua !== duaContent || initialState.wellcome !== wlcomeContent
    );
  };

  const handleDiscardChanges = () => {
    setDuaContent(initialState.dua);
    setWlcomeContent(initialState.wellcome);
  };

  const handleSaveChanges = async () => {
    try {
      await contentService.saveContent(duaContent, wlcomeContent);
      toast.success("Content updated successfully.");
      initialState = { dua: duaContent, wellcome: wlcomeContent };
      forceRender(!bool);
    } catch (ex) {
      handleDiscardChanges();
      toast.error(ex.response.data);
    }
  };

  return (
    <Container sx={{ width: 1 }}>
      <Box sx={{ width: 1 }}>
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Typography component="h3" variant="h4" sx={{ mb: 4 }}>
            Content Management
          </Typography>
          <Box sx={{ mb: 3 }}>
            <TextField
              value={duaContent}
              multiline
              fullWidth
              label="Dua Text"
              onChange={(e) => setDuaContent(e.target.value)}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              value={wlcomeContent}
              multiline
              fullWidth
              label="Wellcome Text"
              onChange={(e) => setWlcomeContent(e.target.value)}
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              disabled={!isChanged()}
              onClick={handleSaveChanges}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              sx={{ ml: 1 }}
              onClick={handleDiscardChanges}
            >
              Discard changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EditContent;
