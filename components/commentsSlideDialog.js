import React, { useState } from "react";
import {
  Button,
  Dialog,
  Slide,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Divider,
  Typography,
  TextField,
  Box,
} from "@mui/material/";
import CommentIcon from "@mui/icons-material/InsertCommentOutlined";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="text"
        endIcon={<CommentIcon />}
        onClick={handleClickOpen}
        color="secondary"
      >
        Comments
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Comments
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          mt={2}
          justifyContent="center"
          alignItems={"center"}
          display="flex"
          flexDirection="row"
          sx={{ width: "98%", padding: 1 }}
        >
          <TextField
            fullWidth
            variant="standard"
            name="comment"
            label="Add a Comment"
            onChange={(e) => setComment(e?.target?.value)}
            placeholder="add comment"
            value={comment}
          />
          <Button>submit</Button>
        </Box>
        <List>
          <ListItem button>
            <ListItemText
              primary="This was a tough one."
              secondary="Titania . 1day ago"
            />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Loved this workout!!"
              secondary="Gigi . 1mo ago"
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Can you do these with bodyweight only."
              secondary="Jules. 1y ago"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
