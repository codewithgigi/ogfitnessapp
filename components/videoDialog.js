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

export default function VideoDialog({ item }) {
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
        <PlayCircleIcon fontSize="large" sx={{ color: "black" }} />
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3" sx={{ width: "90%" }}>
            {item?.name}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              width: "10%",
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
          {item?.videoSource && (
            <video
              controls
              width="100%"
              poster={item?.imageSource}
              controlsList="nodownload"
            >
              <source src={item?.videoSource} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          )}
          <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
            {item?.instructions}
          </Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
