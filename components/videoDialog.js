import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Storage } from "aws-amplify";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export default function VideoDialog({ exercise, updateExeriseList }) {
  const [open, setOpen] = useState(false);
  const [videoSource, setVideoSource] = useState();
  const [imageSource, setImageSource] = useState();

  useEffect(() => {
    if (exercise?.video && open && !exercise?.videoSource) getVideoSource();
  }, [exercise, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getVideoSource = async () => {
    if (exercise?.video)
      try {
        console.log("get video", exercise?.video);
        const videoSource = await Storage.get(exercise?.video, {
          level: "protected",
        });
        const imageSource = await Storage.get(exercise.image, {
          level: "protected",
        });
        console.log("listv videosoru", videoSource);
        exercise.videoSource = videoSource;
        exercise.imageSource = videoSource;
        updateExeriseList(exercise);
        if (videoSource) setVideoSource(videoSource);
        if (imageSource) setImageSource(imageSource);
      } catch (error) {
        console.log("error getting video listv", error);
      }
  };

  let signed =
    "https://ogfitnessapp192906-dev.s3.us-west-2.amazonaws.com/public/Back-Squats-1654041132332.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMSJIMEYCIQDN7pW7s768qOAgoBCGrOhrlcyaTnWuttYHx68rfCq5xQIhAIeBorR%2FsEP38JhoCDB6R3ZLqnZbTCYMrCSWZ2zJDZr5KpUCCDkQAhoMNTk3MDUxOTIxMjQ2IgzadDfLZ9cnzX6dwbgq8gFMyvLJV56xTRI3VKBwQ%2FyC64g4ebVQ9bEByGQvxlYSAodKS7uZAIOGvZ3mHalXMwygiVVhp3ipIs1xiq78kd%2B3lcrM1N2Od%2FpLCPJ3wIgxEpRk9d%2F8nk81oHVeCXc6UzNtrkFHi761OUl1XWb7jsrD1YCOcnhIGaPqjL80QsqkkBYcvjFc6Ih8MB5IuiLK5iPPeu1ozTzujj0bQTZcmvfvhAv4o7c6g5iR1BpJnmIiksI2rielamuj9sxSx02Evfk6wEAl63HOjeui%2Fh5gQZ3aPN7XhXr1YFXBoE1fvpIqk%2FML1Vc6GA0cuTIjjyudaVKkgzCpx9qUBjreAWWy94k764rirWz%2B%2B2H6sMF8UTXJVH2yQSl1Kogm4RAJ%2FKar%2BlS5yOw4OrGsB1jGhiffiOmeXZXwdXxxsF9Jsd4v93pCyZWdyMvjAXxsfIiI%2BmQ9gU3FJxHy1zTXzLgXOCjodq1YU%2BcipMwKqbqo3JM5qhgY8id71dyoB6dm7wzB4oYsJNHY0dqXXyrUqbjcDK2YcUK8IP3p4rRGNdNTyM0uzrjoEo%2FOYoZnqUBlcklyZIwY4sAq8hs8r3qxzWMErDkFsdE8%2BvFHrVew3pjlVD%2B%2Fy6X%2BVkcLgadK9rgOOw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220601T002912Z&X-Amz-SignedHeaders=host&X-Amz-Expires=28800&X-Amz-Credential=ASIAYWAYRKNPH4WAYZJA%2F20220601%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=48c909164a2576189098a83a90361d22732e61f3a845a3ed0dbb1a144987ccc4";

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        <PlayCircleIcon />
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogContent>
          <div>{imageSource}</div>
          {imageSource && (
            <img
              //src={"https://www.mainlypaleo.com/mpapplogoicon-180.png"}
              src={signed}
              style={{ height: 200, width: 200, objectFit: "contain" }}
            />
          )}
          {videoSource && (
            <video controls width="100%">
              <source src={videoSource} type="video/mp4" />
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
