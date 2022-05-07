import React, { useState, useContext } from "react";
import {
  Button,
  Typography,
  TextField,
  CircularProgress,
  Grid,
  Chip,
} from "@mui/material";
import { API, Storage } from "aws-amplify";
import { createExercise, updateExercise } from "../src/graphql/mutations";
import Section from "../components/Section";
import { useRouter } from "next/router";
import Context from "../src/context";

const initialState = {
  image: "",
  video: "",
  name: "",
  muscles: "", //Abs - Lower
  bodypart: "", // Core, Lower, upper
  level: "",
  push: false, //if false its a pull
  joint: "", //SM, M
  equipment: "",
  instructions: "",
  vimeoId: "",
};

export default function AddExercise({ exercise, setEdit, setEdited }) {
  const [formData, setFormData] = useState(initialState);
  const [imageUpload, setImageUpload] = useState();
  const [image, setImage] = useState();
  const [videoUpload, setVideoUpload] = useState();
  const [video, setVideo] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const addExercise = async () => {
    setLoading(true);
    if (!formData?.name) {
      setError("enter exercise name");
    }
    try {
      const filename = formData?.image;
      if (image) await Storage.put(filename, image);
      const videoFilename = formData?.video;
      if (video) await Storage.put(videoFilename, video);

      let newdata = {
        name: formData?.name,
        instructions: formData?.instructions,
        image: formData?.image,
        video: formData?.video,
        level: formData?.level,
        push: formData?.push,
        joint: formData?.joint,
        muscles: formData?.muscles,
        equipment: formData?.equipment,
      };
      const { data } = await API.graphql({
        query: exercise ? updateExercise : createExercise,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { input: { exercise: { ...newdata } } },
      });

      let updatedExercise = data?.updateExercise;
      if (updatedExercise) {
        if (updatedExercise?.image) {
          const image = await Storage.get(updatedExercise?.image);
          updatedExercise.image = image;
        }
        setEdited(updatedExercise);
        setImageUpload();
        setVideoUpload();
        setError();
      }
      setFormData({});
      setLoading(false);
      if (setEdit) setEdit(false);
      setError();
      setLoading(false);
      router.push("/exercises");
    } catch (error) {
      console.log("error", error);
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
      if (!e.target.files[0]) return;
      const file = e.target.files[0];
      const fileparts = file.name.split(".");
      const timestamp = new Date().getTime();
      const filename = `${formData?.name}-${timestamp}.${fileparts[1]}`;
      setFormData({ ...formData, image: filename });
      setImage(file);
      setImageUpload(URL.createObjectURL(e.target.files[0]));
      setLoading(false);
    } else alert("enter a name");
  }

  async function onChangeVideo(e) {
    if (formData?.name) {
      setLoading(true);
      if (!e.target.files[0]) return;
      const file = e.target.files[0];
      const fileparts = file.name.split(".");
      const timestamp = new Date().getTime();
      const filename = `${formData.name}-${timestamp}.${fileparts[1]}`;
      setFormData({ ...formData, video: filename });
      setVideo(file);
      setVideoUpload(URL.createObjectURL(e.target.files[0]));
      setLoading(false);
    } else alert("enter name");
  }

  return (
    <Section>
      <Typography variant="h1" sx={{ paddingLeft: 1, paddingBottom: 3 }}>
        Add Exercise
      </Typography>
      <Grid container spacing={2}>
        {state?.user && (
          <Grid item md={formData ? 6 : 12} xs={12} container spacing={2}>
            <Grid item xs={12} md={12}>
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
                fullWidth
              />
            </Grid>
            {formData?.name && (
              <Grid item md={12} xs={12}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={onChange}
                />
                <label htmlFor="raised-button-file">
                  <Button color="primary" component="span">
                    {formData?.image ? "Change Image" : "Add an image"}
                  </Button>
                </label>
              </Grid>
            )}
            {formData?.name && (
              <Grid item md={12} xs={12}>
                {imageUpload && (
                  <img
                    src={imageUpload}
                    style={{ height: 100, width: 100, objectFit: "contain" }}
                  />
                )}
                <input
                  type="file"
                  id="raised-video-file"
                  accept="video/*"
                  onChange={onChangeVideo}
                  style={{ display: "none" }}
                />
              </Grid>
            )}
            {formData?.name && (
              <Grid item md={12} xs={12}>
                <label htmlFor="raised-video-file">
                  <Button color="primary" component="span">
                    {formData?.video ? "Change Video" : "Add a video"}
                  </Button>
                </label>
              </Grid>
            )}
            <Typography variant="h2" sx={{ paddingLeft: 2, paddingTop: 3 }}>
              Level
            </Typography>
            <Grid container item xs={12} md={12} spacing={1}>
              {["beginner", "intermediate", "advanced"].map((x) => (
                <Grid item>
                  <Chip
                    sx={{ textTransform: "capitalize" }}
                    key={x}
                    label={x}
                    name="level"
                    value={x}
                    variant={formData?.level === x ? "filled" : "outlined"}
                    color="primary"
                    onClick={() => setFormData({ ...formData, level: x })}
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h2" sx={{ paddingLeft: 2, paddingTop: 3 }}>
              Body Part
            </Typography>
            <Grid container item xs={12} md={12} spacing={1}>
              {["upper", "lower", "core"].map((x) => (
                <Grid item>
                  <Chip
                    sx={{ textTransform: "capitalize" }}
                    key={x}
                    label={x}
                    variant={formData?.bodypart === x ? "filled" : "outlined"}
                    color="primary"
                    onClick={() => setFormData({ ...formData, bodypart: x })}
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h2" sx={{ paddingLeft: 2, paddingTop: 3 }}>
              Equipment
            </Typography>
            <Grid container item xs={12} md={12} spacing={1}>
              {["bodyweight", "machine", "free weights"].map((x) => (
                <Grid item>
                  <Chip
                    sx={{ textTransform: "capitalize" }}
                    key={x}
                    label={x}
                    variant={formData?.equipment === x ? "filled" : "outlined"}
                    color="primary"
                    onClick={() => {
                      setFormData({ ...formData, equipment: x });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h2" sx={{ paddingLeft: 2, paddingTop: 3 }}>
              Primary Muscles
            </Typography>
            <Grid container item xs={12} md={12} spacing={1}>
              {[
                "abs",
                "back",
                "biceps",
                "calves",
                "chest",
                "glutes",
                "hamstrings",
                "quads",
                "shoulders",
                "triceps",
              ].map((x) => (
                <Grid item>
                  <Chip
                    sx={{ textTransform: "capitalize" }}
                    key={x}
                    label={x}
                    variant={formData?.muscles === x ? "filled" : "outlined"}
                    color="primary"
                    onClick={() => setFormData({ ...formData, muscles: x })}
                  />
                </Grid>
              ))}
            </Grid>
            <Typography variant="h2" sx={{ paddingLeft: 2, paddingTop: 3 }}>
              Joints
            </Typography>
            <Grid container item xs={12} md={12} spacing={1}>
              <Grid item>
                <Chip
                  sx={{ textTransform: "capitalize" }}
                  label={"Single-Joint"}
                  variant={formData?.joint === "SJ" ? "filled" : "outlined"}
                  color="primary"
                  onClick={() => setFormData({ ...formData, joint: "SJ" })}
                />
              </Grid>
              <Grid item>
                <Chip
                  sx={{ textTransform: "capitalize" }}
                  label={"Multi-Joint"}
                  variant={formData?.joint === "MJ" ? "filled" : "outlined"}
                  color="primary"
                  onClick={() => setFormData({ ...formData, joint: "MJ" })}
                />
              </Grid>
            </Grid>
            <Typography variant="h2" sx={{ paddingLeft: 2, paddingTop: 3 }}>
              Push or Pull
            </Typography>
            <Grid container item xs={12} md={12} spacing={1}>
              <Grid item>
                <Chip
                  sx={{ textTransform: "capitalize" }}
                  label={"Push"}
                  variant={formData?.push === true ? "filled" : "outlined"}
                  color="primary"
                  onClick={() => setFormData({ ...formData, push: true })}
                />
              </Grid>
              <Grid item>
                <Chip
                  sx={{ textTransform: "capitalize" }}
                  label={"Pull"}
                  variant={formData?.push === false ? "filled" : "outlined"}
                  color="primary"
                  onClick={() => setFormData({ ...formData, push: false })}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-multiline-static"
                variant="outlined"
                multiline
                rows={6}
                required
                label="Instructions"
                name="instructions"
                onChange={handleChange}
                value={formData?.instructions ?? ""}
                fullWidth
              />
            </Grid>
            {loading ? (
              <Grid item>
                <Button variant="contained" color="primary" disabled>
                  <CircularProgress /> Finish and Save
                </Button>
              </Grid>
            ) : (
              <Grid item container justifyContent="space-between" xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setImage();
                    setVideo();
                    setImageUpload();
                    setVideoUpload();
                    setFormData(initialState);
                  }}
                >
                  Clear Form
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addExercise}
                >
                  Finish and Save
                </Button>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Section>
  );
}
