import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export default function VideoDialog({ exercise }) {
  const [open, setOpen] = useState(false);

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
          <div>{exercise?.imageSource}</div>
          {exercise?.imageSource && (
            <img
              src={exercise?.imageSource}
              style={{ height: 200, width: 200, objectFit: "contain" }}
            />
          )}
          {exercise?.videoSource && (
            <video controls width="100%">
              <source src={exercise?.videoSource} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
