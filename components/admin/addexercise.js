import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
  Typography,
} from "@mui/material";
import { API, Storage } from "aws-amplify";
import { createExercise, updateExercise } from "../../src/graphql/mutations";

export default function AddExercise({ exercise, setEdit, updateExeriseList }) {
  const [formData, setFormData] = useState({});
  const [imageUpload, setImageDisplay] = useState();
  const [image, setImage] = useState();
  const [videoUpload, setVideoDisplay] = useState();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const addExercise = async () => {
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

      const query = exercise ? updateExercise : createExercise;
      if (exercise) newdata.id = exercise?.id;
      const { data } = await API.graphql({
        query: query,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { input: { ...newdata } },
      });

      let newExercise = data?.createExercise ?? data?.updateExercise;
      setFormData();
      setLoading(false);
      if (setEdit) setEdit(false);
      setError();
      setLoading(false);
      updateExeriseList(newExercise);
    } catch (error) {
      setLoading(false);
      setError("Oops there was an error creating/updating exercise");
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

  return (
    <Box>
      {loading ? (
        <Box>
          <Typography>Uploading exercise. This may take a while ...</Typography>
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
            label="Exercise name"
            onChange={handleChange}
            placeholder="Name"
            value={formData?.name}
            inputProps={{ maxLength: 50 }}
            fullWidth
          />
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="select-muscles">Primary Muscles</InputLabel>
            <Select
              labelId="select-muscles"
              value={formData?.muscle}
              name="muscles"
              label="Primary Muscle"
              onChange={handleChange}
            >
              {[
                "chest",
                "forearms",
                "lats",
                "middle back",
                "lower back",
                "neck",
                "quadriceps",
                "hamstrings",
                "calves",
                "triceps",
                "traps",
                "shoulders",
                "abdominals",
                "glutes",
                "biceps",
                "adductors",
                "abductors",
              ].map((x) => (
                <MenuItem value={x}>{x}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="select-equipment">Equipment</InputLabel>
            <Select
              labelId="select-equipment"
              value={formData?.muscle}
              name="equipment"
              label="Equipment"
              onChange={handleChange}
            >
              {[
                "Bands",
                "Foam Roll",
                "Barbell",
                "Kettlebells",
                "Body Only",
                "Machine",
                "Cable",
                "Medicine Ball",
                "Dumbbell",
                "None",
                "E-Z Curl Bar",
                "Exercise Ball",
                "Other",
              ].map((x) => (
                <MenuItem value={x}>{x}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* <ToggleButtonGroup
            color="primary"
            value={formData?.level}
            exclusive
            onChange={handleChange}
            sx={{ mt: 3 }}
          >
            {["beginner", "intermediate", "advanced"].map((x) => (
              <ToggleButton name="level" value={x}>
                {x}
              </ToggleButton>
            ))}
          </ToggleButtonGroup> */}
          <TextField
            id="standard-multiline-static"
            variant="outlined"
            multiline
            rows={6}
            required
            label="Instructions"
            name="instructions"
            inputProps={{ maxLength: 1550 }}
            onChange={handleChange}
            value={formData?.instructions ?? ""}
            fullWidth
            sx={{ mt: 3 }}
          />
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
            <Box sx={{ mt: 3 }}>
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
          {loading ? (
            <Button variant="contained" color="primary" disabled>
              <CircularProgress /> Finish and Save
            </Button>
          ) : (
            [
              <Grid item>
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
              </Grid>,
              <Grid
                item
                container
                justifyContent="space-between"
                xs={12}
                sx={{ mt: 3, mb: 3 }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={addExercise}
                  disabled={
                    !formData?.name ||
                    !formData?.muscles ||
                    !formData?.equipment ||
                    !formData?.instructions
                  }
                >
                  Finish and Save
                </Button>
              </Grid>,
            ]
          )}
        </Box>
      )}
    </Box>
  );
}
