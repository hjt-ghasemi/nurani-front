import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { LoadingContext } from "../contexts";
import messageService from "../services/messageService";
import duaContentSerivce from "../services/duaContentService";

let initialState = { dua: "", message: "" };

const EditContent = () => {
  const [duaContent, setDuaContent] = useState("");
  const [message, setMessage] = useState("");
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const {
        data: {
          content: { seti_val: dua },
        },
      } = await duaContentSerivce.getDuaContent();
      const {
        data: {
          content: { seti_val: message },
        },
      } = await messageService.getMessage();

      initialState = { message, dua };
      setDuaContent(dua);
      setMessage(message);
      setLoading(false);
    };

    try {
      fetchData();
    } catch (ex) {
      // 404 error
      toast.error(ex.responnse.data.message.toUpperCase());
      setLoading(false);
    }
  }, []);

  const isChanged = () => {
    return initialState.dua !== duaContent || initialState.message !== message;
  };

  const handleDiscardChanges = () => {
    setDuaContent(initialState.dua);
    setMessage(initialState.message);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      if (duaContent !== initialState.dua)
        await duaContentSerivce.setDuaContent(duaContent);
      if (message !== initialState.message)
        await messageService.setMessage(message);
      toast.success("Content updated successfully.");
      initialState = { dua: duaContent, message };
    } catch (ex) {
      handleDiscardChanges();
      // 401
      const error = ex.response.data.errors && ex.response.data.errors.value[0];
      toast.error(error);
    }
    setLoading(false);
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
              value={message}
              multiline
              fullWidth
              label="Wellcome Text"
              onChange={(e) => setMessage(e.target.value)}
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
