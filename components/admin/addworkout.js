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
import { API } from "aws-amplify";
import MultiSelectExercises from "../../components/autocomplete";
import { createWorkout } from "../../src/graphql/mutations";
import { useRouter } from "next/router";

export default function AddWorkout({ setEdit, exercises, setShowAdd }) {
  const [formData, setFormData] = useState({});
  const [exerciseList, setExerciseList] = useState([]);
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
      setShowAdd();
      router.replace("/admin-page?view=workouts");
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
            label="Workout name - (user sees in program - weight training, cardio)"
            onChange={handleChange}
            placeholder="Name"
            value={formData?.name}
            inputProps={{ maxLength: 50 }}
            fullWidth
          />
          <TextField
            autoFocus
            required
            variant="outlined"
            margin="dense"
            name="description"
            label="Workout description"
            onChange={handleChange}
            placeholder="Description"
            value={formData?.description}
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
