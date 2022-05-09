import React, { useState, useContext } from "react";
import { Button, TextField, CircularProgress, Grid } from "@mui/material";
import { API, Storage } from "aws-amplify";
import { createExercise, updateExercise } from "../src/graphql/mutations";
import Section from "../components/Section";
import { useRouter } from "next/router";
import Context from "../src/context";
import { ChipSelection } from "./onboarding";

const initialState = {
  name: "",
  muscles: "",
  level: "",
  bodypart: "",
  instructions: "",
  image: "",
  video: "",
};

export default function AddExercise({ exercise, setEdit, setEdited }) {
  const [formData, setFormData] = useState(initialState);
  const [imageUpload, setImageUpload] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { state } = useContext(Context);
  const router = useRouter();

  const addExercise = async () => {
    setLoading(true);
    if (!formData?.name) {
      setError("enter exercise name");
    }
    try {
      const filename = formData?.image;
      if (image) await Storage.put(filename, image);

      let newdata = {
        name: formData?.name,
        muscles: formData?.muscles,
        level: formData?.level,
        bodypart: formData?.bodypart,
        instructions: formData?.instructions,
        image: formData?.image,
        video: formData?.video,
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
    } else alert("enter an exercise name");
  }

  return (
    <Section>
      <h1>Add Exercise</h1>
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

            <h2>Primary Muscles</h2>
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
                  <ChipSelection
                    value={x}
                    field={formData?.muscles}
                    onclick={() => setFormData({ ...formData, muscles: x })}
                  />
                </Grid>
              ))}
            </Grid>
            <h2>Level</h2>
            <Grid container item xs={12} md={12} spacing={1}>
              {["beginner", "intermediate", "advanced"].map((x) => (
                <Grid item>
                  <ChipSelection
                    value={x}
                    field={formData?.level}
                    onclick={() => setFormData({ ...formData, level: x })}
                  />
                </Grid>
              ))}
            </Grid>
            <h2>Body Part</h2>
            <Grid container item xs={12} md={12} spacing={1}>
              {["upper", "lower", "core"].map((x) => (
                <Grid item>
                  <ChipSelection
                    value={x}
                    field={formData?.bodypart}
                    onclick={() => setFormData({ ...formData, bodypart: x })}
                  />
                </Grid>
              ))}
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
            <Grid item xs={12} md={12}>
              <TextField
                autoFocus
                variant="outlined"
                margin="dense"
                name="video"
                label="Video Link/Id (Vimeo)"
                onChange={handleChange}
                placeholder="Video"
                value={formData?.video}
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
              </Grid>
            )}
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
                    setImageUpload();
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
