import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listWorkouts } from "../../src/graphql/queries";
import { deleteWorkout } from "../../src/graphql/mutations";
import {
  Box,
  Fab,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddWorkout from "./addworkout";
import { ExerciseList } from "./exercises";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { listExercises } from "./exercises";
import DeleteDialog from "../deleteDialog";

export const WorkoutAccordion = ({ workout, key }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Accordion expanded={expanded === key} onChange={handleChangeExpanded(key)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography
          variant="h3"
          sx={{
            width: "80%",
            flexShrink: 0,
            textTransform: "capitalize",
          }}
        >
          {workout?.name}
        </Typography>
        {/* <Typography
          variant="h5"
          sx={{
            width: "80%",
            flexShrink: 0,
            textTransform: "capitalize",
          }}
        >
          {workout?.instructions}
        </Typography> */}
        <Box sx={{ width: "20%" }}>
          <DeleteDialog
            removeItem={() => removeWorkout(workout)}
            item={workout}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography sx={{ color: "text.secondary" }}>
          {workout?.instructions}
        </Typography>
        {workout?.exercises && workout?.exercises.length > 0 && (
          <ExerciseList list={workout?.exercises} />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default function Workouts() {
  const [workouts, setWorkouts] = useState();
  const [exercises, setExercises] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    getWorkoutList();
    getExerciseList();
  }, []);

  useEffect(() => {
    getWorkoutList();
  }, [showAdd]);

  async function getWorkoutList() {
    try {
      const { data } = await API.graphql({
        query: listWorkouts,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listWorkouts?.items;
      setWorkouts(items);
    } catch (error) {
      console.warn("Error with api listWorkouts", error);
    }
  }

  async function getExerciseList() {
    try {
      const { data } = await API.graphql({
        query: listExercises,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listExercises?.items;
      setExercises(items);
    } catch (error) {
      console.warn("Error with api getProfile", error);
    }
  }

  const removeWorkout = async (x) => {
    if (x) {
      try {
        await API.graphql({
          query: deleteWorkout,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: { input: { id: x?.id } },
        });
        const newset = workouts.filter((e) => e.id !== x?.id);
        setWorkouts(newset);
        setFilter();
        setFiltered();
      } catch (error) {
        console.log("error in delete exercise", error);
      }
    }
  };

  return (
    <>
      <Box mt={2} sx={{ textAlign: "right" }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => setShowAdd(!showAdd)}
          sx={{ mb: 3 }}
        >
          {!showAdd ? <AddIcon /> : <CloseIcon />}
        </Fab>
      </Box>
      {showAdd ? (
        <AddWorkout
          setShowAdd={setShowAdd}
          showAdd={showAdd}
          // updateWorkoutList={}
          exercises={exercises}
        />
      ) : (
        <div>
          {(workouts ?? []).map((x, index) => (
            <WorkoutAccordion workout={x} key={index} />
          ))}
        </div>
      )}
    </>
  );
}
