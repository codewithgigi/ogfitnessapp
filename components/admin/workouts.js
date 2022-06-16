import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listWorkouts } from "../../src/graphql/queries";
import {
  Box,
  Fab,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddWorkout from "./addworkout";
import { getStorageFiles, ExerciseList } from "./exercises";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { listExercises } from "./exercises";

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

  async function getWorkoutList() {
    try {
      const { data } = await API.graphql({
        query: listWorkouts,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listWorkouts?.items;
      let newItems = await getStorageFiles(items);
      //get image
      let itemsImages = await Promise.all(
        newItems.map(async (item) => {
          try {
            let items = await getStorageFiles(item?.exercises);
            item.exercises = items;
            return item;
          } catch (error) {
            console.log("error getting workout images");
          }
        }),
      );
      setWorkouts(itemsImages);
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
        //remove videos and images as well
        //ToDO:  make sure this workout is not in any programs first
        //if (x?.image) await Storage.remove(x?.image);
        //if (x?.video) await Storage.remove(x?.video);
        const newset = workouts.filter((e) => e.id !== x?.id);
        setWorkouts(newset);
        setFilter();
        setFiltered();
      } catch (error) {
        console.log("error in delete exercise", error);
      }
    }
  };
  console.log("workouts", workouts);
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
            <Accordion
              expanded={expanded === index}
              onChange={handleChangeExpanded(index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  variant="h3"
                  sx={{
                    width: "33%",
                    flexShrink: 0,
                    textTransform: "capitalize",
                  }}
                >
                  {x?.name}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {x?.instructions}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {x?.exercises && x?.exercises.length > 0 && (
                  <ExerciseList list={x?.exercises} />
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </>
  );
}
