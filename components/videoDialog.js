import * as React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export default function VideoDialog({ videoSource }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <PlayCircleIcon />
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent>
          <video controls width="100%">
            <source src={videoSource} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
