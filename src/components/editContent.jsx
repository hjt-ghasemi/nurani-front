import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";

const EditContent = () => {
  const [duaContent, setDuaContent] = useState(
    "Allahumma la sahla illa ma ja'altahu sahla, wa Anta taj'alul hazna idha shi'ta sahla'' Translations: '' O Allah, there is noting easy expect ehat You make easy, and You can make hardship easy if You will."
  );
  const [wlcomeContent, setWlcomeContent] = useState(
    "The best day on which the sun has risen is Friday. On it, Adam was created, on it, he was admitted to Paradise, and on it, he was expelled from it. And the last hour will take place on no day other than Friday. (Sahih Muslim 854)."
  );

  return (
    <Container sx={{ width: 1 }}>
      <Box sx={{ width: 1 }}>
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Typography component="h3" variant="h4" sx={{ mb: 2 }}>
            Dua Content
          </Typography>
          <TextField
            value={duaContent}
            multiline
            fullWidth
            onChange={(e) => setDuaContent(e.target.value)}
          />
          <Box sx={{ mt: 3 }}>
            <Button variant="contained">Save</Button>
            <Button variant="outlined" color="error" sx={{ ml: 1 }}>
              Discard changes
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 7 }} />
      <Box sx={{ width: 1 }}>
        <Box
          sx={{
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Typography component="h3" variant="h4" sx={{ mb: 2 }}>
            Wellcome Content
          </Typography>
          <TextField
            value={wlcomeContent}
            multiline
            fullWidth
            onChange={(e) => setWlcomeContent(e.target.value)}
          />
          <Box sx={{ mt: 3 }}>
            <Button variant="contained">Save</Button>
            <Button variant="outlined" color="error" sx={{ ml: 1 }}>
              Discard changes
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default EditContent;
