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
import TextSnippet from "@mui/icons-material/TextSnippet";
import CloseIcon from "@mui/icons-material/Close";
import { palette } from "../src/theme";

export default function VideoDialog({ item, size, color }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const itemVideo = item?.video ? item?.video : "assets/exercise/squat.mp4";

  return (
    <React.Fragment>
      <PlayCircleIcon
        sx={{
          color: palette.navdark,
          marginRight: 1,
          padding: 0,
          fontSize: "2rem",
        }}
        className="playbutton"
        onClick={handleClickOpen}
      />
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
          {itemVideo && (
            <video
              controls
              width="100%"
              //poster={`https://ogfitnessapp192906-dev.s3.us-west-2.amazonaws.com/public/${item?.image}`}
              controlsList="nodownload"
            >
              <source
                //src={`https://ogfitnessapp192906-dev.s3.us-west-2.amazonaws.com/public/${itemVideo}`}
                src={`/${itemVideo}`}
                type="video/mp4"
              />
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
