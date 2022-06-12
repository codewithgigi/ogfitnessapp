import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Grid,
  Box,
  Alert,
  Typography,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { API, Storage } from "aws-amplify";
import { createProgram } from "../../src/graphql/mutations";
import { useRouter } from "next/router";
import AddWorkoutDialog from "../addWorkoutDialog";
import Checkbox from "@mui/material/Checkbox";

export default function AddProgram({
  program,
  setEdit,
  updateProramList,
  workouts,
}) {
  const [formData, setFormData] = useState({});
  const [workoutList, setWorkoutList] = useState([]);
  const [imageUpload, setImageDisplay] = useState();
  const [image, setImage] = useState();
  const [videoUpload, setVideoDisplay] = useState();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const router = useRouter();

  const addProgram = async () => {
    setLoading(true);
    if (!formData?.name) {
      setError("enter exercise name");
      setLoading(false);
      return;
    }
    if (!formData?.level) {
      setError("select at least one level");
      setLoading(false);
      return;
    }
    if (!formData?.age) {
      setError("select at least one age range");
      setLoading(false);
      return;
    }
    if (!formData?.goal) {
      setError("select at least one goal");
      setLoading(false);
      return;
    }
    if (!formData?.gender) {
      setError("select at least one gender");
      setLoading(false);
      return;
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
      if (workoutList.length > 0)
        newdata.workoutList = { workout: { workoutList } };
      if (formData?.workoutDescription) {
        newdata.workoutList = {
          workout: {
            ...workoutList,
            workoutDescription: formData.workoutDescription,
          },
        };
        delete newdata.workoutDescription;
      }
      if (formData?.workoutName) {
        newdata.workoutList = {
          workout: {
            ...workoutList,
            workoutName: formData.workoutName,
          },
        };
        delete newdata.workoutName;
      }
      if (formData?.day) {
        newdata.workoutList = {
          workout: {
            ...workoutList,
            day: formData.day,
          },
        };
        delete newdata.day;
      }
      await API.graphql({
        query: createProgram,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { input: { ...newdata } },
      });

      setFormData({});
      setLoading(false);
      if (setEdit) setEdit(false);
      setError();
      router.push("/admin?view=programs");
    } catch (error) {
      setLoading(false);
      setError("Oops there was an error creating/updating program");
      console.log("error creating/updating program", error);
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

  const setProgramWorkouts = (workouts) => {
    setFormData({ ...formData, workoutList: workouts });
  };

  const renderAddWorkout = () => {
    const weeks = new Array();
    for (let i = 1; i <= Number(formData?.weeks) ?? 0; i++) {
      weeks.push(
        <div>
          <AddWorkoutDialog
            week={i}
            workouts={workouts}
            programname={formData?.name ?? ""}
            setProgramWorkouts={setProgramWorkouts}
          />
        </div>,
      );
    }
    return <div>{[...weeks]}</div>;
  };

  const changeSelection = ({ selection, value }) => {
    const selections = formData[selection] ?? [];
    const newSelections = new Set(selections);
    if (newSelections.has(value)) {
      newSelections.delete(value);
    } else {
      newSelections.add(value);
    }
    setFormData({ ...formData, [selection]: [...newSelections] });
  };

  console.log("data", formData);
  return (
    <Box>
      {loading ? (
        <Box>
          <Typography>Uploading program. This may take a while ...</Typography>
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
            label="Program Name ....."
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
            label="Description"
            name="description"
            inputProps={{ maxLength: 250 }}
            onChange={handleChange}
            value={formData?.description ?? ""}
            fullWidth
            sx={{ mt: 3 }}
          />

          <Typography variant="h3" mt={2}>
            Select Program Levels
          </Typography>
          <FormGroup row={true}>
            {["beginner", "experienced"].map((x) => (
              <FormControlLabel
                key={x}
                sx={{ textTransform: "capitalize" }}
                onClick={() =>
                  changeSelection({ selection: "level", value: x })
                }
                control={<Checkbox />}
                label={x}
              />
            ))}
          </FormGroup>
          <Typography variant="h3" mt={2}>
            Select Program Ages
          </Typography>
          <FormGroup row={true}>
            {["18-30", "31-45", "45+"].map((x) => (
              <FormControlLabel
                key={x}
                onClick={() => changeSelection({ selection: "age", value: x })}
                control={<Checkbox />}
                label={x}
              />
            ))}
          </FormGroup>
          <Typography variant="h3" mt={2}>
            Select Program Goals
          </Typography>
          <FormGroup row={true}>
            {["fat-loss", "muscle-gain"].map((x) => (
              <FormControlLabel
                sx={{ textTransform: "capitalize" }}
                key={x}
                onClick={() => changeSelection({ selection: "goal", value: x })}
                control={<Checkbox />}
                label={x}
              />
            ))}
          </FormGroup>

          <Typography variant="h3" mt={2}>
            Select Program Gender
          </Typography>
          <FormGroup row={true}>
            {["female", "male"].map((x) => (
              <FormControlLabel
                sx={{ textTransform: "capitalize" }}
                key={x}
                onClick={() =>
                  changeSelection({ selection: "gender", value: x })
                }
                control={<Checkbox />}
                label={x}
              />
            ))}
          </FormGroup>
          <TextField
            id="standard-multiline-static"
            variant="outlined"
            required
            type="number"
            label="Number of Weeks"
            name="weeks"
            inputProps={{ maxLength: 250 }}
            onChange={handleChange}
            value={formData?.weeks ?? ""}
            fullWidth
            sx={{ mt: 3 }}
          />
          <Box mt={2} mb={2}>
            {renderAddWorkout()}
          </Box>
          {formData?.name && (
            <Grid container direction={"row"}>
              <Grid item xs={6}>
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
                  <Button color="primary" component="span" variant="outlined">
                    {formData?.image ? "Change Image" : "Add an image"}
                  </Button>
                </label>
                {formData?.name && imageUpload && (
                  <Box>
                    <img
                      src={imageUpload}
                      style={{ height: 200, width: 200, objectFit: "contain" }}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={6}>
                <input
                  accept="video/mp4"
                  name="video"
                  style={{ display: "none" }}
                  id="video-upload"
                  multiple
                  type="file"
                  onChange={onChange}
                />
                <label htmlFor="video-upload">
                  <Button color="primary" component="span" variant="outlined">
                    {formData?.video ? "Change Video" : "Add a video"}
                  </Button>
                </label>
                {formData?.name && videoUpload && (
                  <Box mt={4}>
                    <video controls width="250">
                      <source src={videoUpload} type="video/mp4" />
                      Sorry, your browser doesn't support embedded videos.
                    </video>
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
          {formData?.name && <Box mt={3} mb={3}></Box>}
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
              onClick={addProgram}
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
