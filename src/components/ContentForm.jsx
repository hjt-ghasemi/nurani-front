import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  getDua,
  loadDua,
  isDuaModified,
  discardDuaChanges,
  updateDua,
  saveDua,
} from "../store/dua";
import {
  getMessage,
  loadMessage,
  isMessageModified,
  discardMessageChanges,
  updateMessage,
  saveMessage,
} from "../store/message";

const ContentForm = () => {
  const dispatch = useDispatch();
  const dua = useSelector(getDua);
  const message = useSelector(getMessage);
  const messageModified = useSelector(isMessageModified);
  const duaModified = useSelector(isDuaModified);

  useEffect(() => {
    dispatch(loadDua);
    dispatch(loadMessage);
  }, []);

  const isChanged = () => {
    return duaModified || messageModified;
  };

  const handleDiscardChanges = () => {
    dispatch(discardDuaChanges);
    dispatch(discardMessageChanges);
  };

  const handleSaveChanges = () => {
    dispatch(saveDua);
    dispatch(saveMessage);
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
              value={dua}
              multiline
              rows={5}
              fullWidth
              label="Dua Text"
              onChange={(e) => dispatch(updateDua(e.target.value))}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <TextField
              value={message}
              multiline
              rows={5}
              fullWidth
              label="Wellcome Text"
              onChange={(e) => dispatch(updateMessage(e.target.value))}
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

export default ContentForm;
