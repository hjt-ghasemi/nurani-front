import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteImageDialog({ open, setOpen, onDelete }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog maxWidth="xs" open={open} onClose={handleClose}>
        <DialogTitle>Are you sure want to delete this record?</DialogTitle>

        <DialogActions>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            Delete
          </Button>
          <Button onClick={handleClose} sx={{ marginLeft: 1 }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
