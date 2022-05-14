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

import React, { useState, useContext } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Grid,
  Autocomplete,
  Stack,
} from "@mui/material";
import { API } from "aws-amplify";
import { createWorkout, updateWorkout } from "../../src/graphql/mutations";
import Section from "../../components/Section";
import { useRouter } from "next/router";
import Context from "../../src/context";

const initialState = {
  name: "",
  instructions: "",
  exercises: [],
};

const AutoCompleteInput = ({ data }) => {
  return (
    <Grid container spacing={1} direction={"row"} mt={2}>
      <Grid item xs={8}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={data.map((option) => option.label)}
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

  const exerciseList = [
    { label: "Squat", year: 1994 },
    { label: "Deadlift", year: 1972 },
    { label: "Hanging leg raise", year: 1974 },
    { label: "Situps", year: 2008 },
  ];

  return (
    <Section>
      <h1>Add Workout</h1>
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
              <AutoCompleteInput data={exerciseList} />
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
