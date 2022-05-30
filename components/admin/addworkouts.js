// input CreatePlanInput {
// 	id: ID
// 	name: String
// 	image: String
// 	video: String
// 	description: String
// 	instructions: String
// 	active: Boolean
// 	goal: Goal
// 	level: Level
// }

// input CreatePlanWorkoutsInput {
// 	id: ID
// 	workoutID: ID!
// 	planID: ID!
// }
// input CreateWorkoutInput {
// 	id: ID
// 	name: String
// 	instructions: String
// }

import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { API } from "aws-amplify";

import { createWorkout, updateWorkout } from "../../src/graphql/mutations";
import { listExercises } from "../../src/graphql/queries";
import Section from "../../components/Section";
import { useRouter } from "next/router";
import Context from "../../src/context";
import MulitSelect from "../../components/autocomplete";

const initialState = {
  name: "",
  instructions: "",
  exercises: [],
};

const filter = createFilterOptions();

const AutoCompleteInput = ({ data, handleChange }) => {
  return (
    <Grid container spacing={1} direction={"row"} mt={2}>
      <Grid item xs={8}>
        <Autocomplete
          multiple
          id="tags-filled"
          options={data.map((option) => option?.name)}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              label="freeSolo"
              placeholder="Favorites"
            />
          )}
        />
        <Autocomplete
          onChange={(option) => handleChange(option)}
          id="free-solo-demo"
          options={data.map((option) => option?.name)}
          renderInput={(params) => (
            <TextField {...params} label="Add exercise" />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="outline"
          color="primary"
          sx={{ height: "100%" }}
          onClick={() => console.log("add exercies")}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default function AddWorkout({ workout, setEdit, setEdited }) {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { state } = useContext(Context);
  const router = useRouter();
  const [exercises, setExercises] = useState();

  const getExerciseList = async () => {
    try {
      const { data } = await API.graphql({
        query: listExercises,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listExercises?.items;
      setExercises(items);
      console.log("items ..", items);
    } catch (error) {
      console.warn("Error with api getProfile", error);
    }
  };

  useEffect(() => {
    getExerciseList();
  }, []);

  const addWorkout = async () => {
    setLoading(true);
    if (!formData?.name) {
      setError("enter workout name");
    }
    try {
      let newdata = {
        name: formData?.name,
        instructions: formData?.instructions,
      };
      const { data } = await API.graphql({
        query: workout ? updateWorkout : createWorkout,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: { input: { ...newdata } },
      });

      setFormData({});
      setLoading(false);
      if (setEdit) setEdit(false);
      setError();
      setLoading(false);
      router.push("/admin");
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

  const handleSelected = (selected) => {
    console.log("selected Exercises", selected);
  };

  console.log("formdata", formData);

  return (
    <Section>
      <h1>Add Workout</h1>
      <div>{JSON.stringify(formData)}</div>
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
                label="Workiout name"
                onChange={handleChange}
                placeholder="Name"
                value={formData?.name}
                fullWidth
              />
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
              {exercises && (
                <MulitSelect data={exercises} handleSelected={handleSelected} />
                // <AutoCompleteInput
                //   data={exercises}
                //   handleChange={handleSelectExercise}
                // />
              )}
            </Grid>
            {loading ? (
              <Grid item>
                <Button variant="contained" color="primary" disabled>
                  <CircularProgress /> Finish and Save
                </Button>
              </Grid>
            ) : (
              formData?.name && (
                <Grid item container justifyContent="space-between" xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setFormData(initialState);
                    }}
                  >
                    Clear Form
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addWorkout}
                  >
                    Finish and Save
                  </Button>
                </Grid>
              )
            )}
          </Grid>
        )}
      </Grid>
    </Section>
  );
}
