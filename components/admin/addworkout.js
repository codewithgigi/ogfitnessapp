import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Grid,
  Box,
  Alert,
  Typography,
} from "@mui/material";
import { API, Storage } from "aws-amplify";
import MultiSelectExercises from "../../components/autocomplete";
import { createWorkout } from "../../src/graphql/mutations";
import { useRouter } from "next/router";

export default function AddWorkout({
  workout,
  setEdit,
  updateWorkoutList,
  exercises,
}) {
  const [formData, setFormData] = useState({});
  const [exerciseList, setExerciseList] = useState([]);
  const [imageUpload, setImageDisplay] = useState();
  const [image, setImage] = useState();
  const [videoUpload, setVideoDisplay] = useState();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const router = useRouter();

  const addWorkout = async () => {
    setLoading(true);
    if (!formData?.name) {
      setError("enter exercise name");
    }
    try {
      let newdata = { ...formData };
      const filename = formData?.image;

      if (image) {
        const { key } = await Storage.put(filename, image, {
          metadata: { name: formData?.name, type: "image" },
        });
        newdata.image = key;
      }
      const vidoeFilename = formData?.video;

      if (video) {
        const { key } = await Storage.put(vidoeFilename, video, {
          metadata: { name: formData?.name, type: "video" },
        });
        newdata.video = key;
      }
      if (exerciseList.length > 0) newdata.exercises = exerciseList;
      await API.graphql({
        query: createWorkout,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { input: { ...newdata } },
      });

      setFormData({});
      setLoading(false);
      if (setEdit) setEdit(false);
      setError();
      router.push("/admin?view=workouts");
    } catch (error) {
      setLoading(false);
      setError("Oops there was an error creating/updating exercise");
      console.log("error creating/updating exercise", error);
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    formData[name] = value;
    setFormData({ ...formData });
  };

  async function onChange(e) {
    if (formData?.name) {
      setLoading(true);
      const name = e?.target?.name;
      const [file] = e.target.files;
      if (!file) return;
      if (name === "video" && file?.type !== "video/mp4") {
        setLoading(false);
        setError("Please upload video/mp4 video format");
        return;
      }
      if (name === "video" && file.size / 1024 / 1024 > 100) {
        setLoading(false);
        setError("video file size is too large. max video is 100MB.");
        return;
      } else {
        const fileparts = file.name.split(".");
        const timestamp = new Date().getTime();
        const filename =
          `${formData?.name}-${timestamp}.${fileparts[1]}`.replaceAll(" ", "-");

        setFormData({ ...formData, [name]: filename });
        if (name === "image") {
          setImage(file);
          setImageDisplay(URL.createObjectURL(e.target.files[0]));
          setLoading(false);
        } else if (name === "video") {
          setVideo(file);
          setVideoDisplay(URL.createObjectURL(e.target.files[0]));
          setLoading(false);
        }
      }
    } else setError("enter an exercise name");
  }

  const addExercise = (list) => {
    setExerciseList(list);
  };

  const updateExercise = ({ field, value, id }) => {
    let newlist = exerciseList.map((x) => {
      if (x.id === id) {
        x[field] = value;
      }
      return x;
    });
    setExerciseList(newlist);
  };

  return (
    <Box>
      {loading ? (
        <Box>
          <Typography>Uploading workout. This may take a while ...</Typography>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <TextField
            autoFocus
            required
            variant="outlined"
            margin="dense"
            name="name"
            label="Workout name"
            onChange={handleChange}
            placeholder="Name"
            value={formData?.name}
            inputProps={{ maxLength: 50 }}
            fullWidth
          />
          <TextField
            id="standard-multiline-static"
            variant="outlined"
            multiline
            rows={6}
            required
            label="Instructions"
            name="instructions"
            inputProps={{ maxLength: 250 }}
            onChange={handleChange}
            value={formData?.instructions ?? ""}
            fullWidth
            sx={{ mt: 3 }}
          />
          <Box mt={2} mb={2}>
            <MultiSelectExercises
              data={exercises}
              handleSelected={(e) => {
                addExercise(e);
              }}
            />
          </Box>
          <Box mt={2} mb={2}>
            {(exerciseList ?? []).map((x) => (
              <Grid container direction="row" spacing={1} alignItems="center">
                <Grid item xs={2}>
                  <TextField
                    id="standard-multiline-static"
                    variant="standard"
                    label="Order"
                    name="order"
                    onChange={(e) =>
                      updateExercise({
                        value: e.target.value,
                        id: x?.id,
                        field: "order",
                      })
                    }
                    value={exerciseList?.reps}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="standard-multiline-static"
                    variant="standard"
                    label="Sets"
                    name="sets"
                    inputProps={{ max: 10, min: 1 }}
                    onChange={(e) =>
                      updateExercise({
                        value: e.target.value,
                        id: x?.id,
                        field: "sets",
                      })
                    }
                    value={exerciseList?.reps}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="standard-multiline-static"
                    variant="standard"
                    label="Reps"
                    name="reps"
                    inputProps={{ max: 10, min: 1 }}
                    onChange={(e) =>
                      updateExercise({
                        value: e.target.value,
                        id: x?.id,
                        field: "reps",
                      })
                    }
                    value={exerciseList?.reps}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="h3" mt={2}>
                    {x?.name}
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Box>
          {formData?.name && (
            <Box sx={{ mt: 3 }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                multiple
                type="file"
                name="image"
                onChange={onChange}
              />
              <label htmlFor="image-upload">
                <Button color="primary" component="span">
                  {formData?.image ? "Change Image" : "Add an image"}
                </Button>
              </label>
              {formData?.name && imageUpload && (
                <div>
                  <img
                    src={imageUpload}
                    style={{ height: 200, width: 200, objectFit: "contain" }}
                  />
                </div>
              )}
            </Box>
          )}
          {formData?.name && (
            <Box mt={3} mb={3}>
              <input
                //accept="video/mp4"
                name="video"
                style={{ display: "none" }}
                id="video-upload"
                multiple
                type="file"
                onChange={onChange}
              />
              <label htmlFor="video-upload">
                <Button color="primary" component="span">
                  {formData?.video ? "Change Video" : "Add a video"}
                </Button>
              </label>
              {formData?.name && videoUpload && (
                <div>
                  <video controls width="250">
                    <source src={videoUpload} type="video/mp4" />
                    Sorry, your browser doesn't support embedded videos.
                  </video>
                </div>
              )}
            </Box>
          )}
          {loading && (
            <Button variant="contained" color="primary" disabled>
              <CircularProgress /> Finish and Save
            </Button>
          )}
          {error && (
            <Alert
              variant="filled"
              severity="error"
              onClose={() => {
                setError();
              }}
            >
              {error}
            </Alert>
          )}
          <Box mt={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={addWorkout}
              disabled={!formData?.name ? true : false}
            >
              Finish and Save
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
