import React, { useState } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Box,
  Alert,
  Typography,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { API } from "aws-amplify";
import { createProgram } from "../../src/graphql/mutations";
import { useRouter } from "next/router";
import AddWorkoutDialog from "./addWorkoutDialog";
import Checkbox from "@mui/material/Checkbox";

export default function AddProgram({ setEdit, workouts, setShowAdd }) {
  const [formData, setFormData] = useState({});
  const [workoutList, setWorkoutList] = useState([]);
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
      setShowAdd();
      if (setEdit) setEdit(false);
      setError();
      router.replace("/admin-page?view=programs");
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

  const setProgramWorkouts = (workouts) => {
    if (formData?.workoutList)
      setFormData({
        ...formData,
        workoutList: [...formData?.workoutList, ...workouts],
      });
    else setFormData({ ...formData, workoutList: [...workouts] });
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
