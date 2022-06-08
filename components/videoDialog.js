import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CloseIcon from "@mui/icons-material/Close";

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
      <Button onClick={handleClickOpen}>
        <PlayCircleIcon fontSize="large" sx={{ color: "white" }} />
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3">{exercise?.name}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {exercise?.videoSource && (
            <video
              controls
              width="100%"
              poster={exercise?.imageSource}
              controlsList="nodownload"
            >
              <source src={exercise?.videoSource} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
