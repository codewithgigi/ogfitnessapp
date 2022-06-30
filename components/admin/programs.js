import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
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
import AddProgram from "./addProgram";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { deleteProgram } from "../../src/graphql/mutations";
import DeleteDialog from "../deleteDialog";

const listWorkouts = /* GraphQL */ `
  query ListWorkouts(
    $filter: ModelWorkoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        video
        instructions
        exercises {
          id
          name
          muscles
          bodypart
          equipment
          instructions
          image
          video
          sets
          reps
          order
        }
      }
      nextToken
    }
  }
`;

const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        image
        video
        description
        active
        goal
        gender
        age
        level
        weeks
        workoutList {
          day
          week
          workout {
            id
            name
            description
            instructions
            exercises {
              id
              name
              sets
              reps
              order
            }
          }
        }
      }
      nextToken
    }
  }
`;

export default function Programs() {
  const [programs, setPrograms] = useState();
  const [workouts, setWorkouts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    getProgramList();
    getWorkouts();
  }, []);
  useEffect(() => {
    getProgramList();
  }, [showAdd]);

  async function getProgramList() {
    try {
      const { data } = await API.graphql({
        query: listPrograms,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listPrograms?.items;
      setPrograms(items);
    } catch (error) {
      console.warn("Error with api listWorkouts", error);
    }
  }

  async function getWorkouts() {
    try {
      const { data } = await API.graphql({
        query: listWorkouts,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listWorkouts?.items;
      setWorkouts(items);
    } catch (error) {
      console.warn("Error with api getProfile", error);
    }
  }

  const removeProgram = async (x) => {
    if (x) {
      try {
        await API.graphql({
          query: deleteProgram,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: { input: { id: x?.id } },
        });
        const newset = programs.filter((e) => e.id !== x?.id);
        setPrograms(newset);
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
        <AddProgram
          setShowAdd={setShowAdd}
          showAdd={showAdd}
          workouts={workouts}
        />
      ) : (
        <div>
          {(programs ?? []).map((x, index) => (
            <Accordion
              key={index}
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
                    width: "80%",
                    flexShrink: 0,
                    textTransform: "capitalize",
                  }}
                >
                  {x?.name}
                </Typography>
                <Box sx={{ width: "20%" }}>
                  <DeleteDialog removeItem={() => removeProgram(x)} item={x} />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {x?.workoutList && x?.workoutList.length > 0 && (
                  <>
                    <Typography sx={{ color: "text.secondary" }}>
                      {x?.description}
                    </Typography>
                    {/* <Typography sx={{ color: "text.secondary" }}>
                      Length: {x?.weeks} weeks
                    </Typography> */}
                    {x.workoutList.map((list, index) => (
                      <Box
                        key={index}
                        borderBottom={
                          index < x?.workoutList.length - 1 ? 0.5 : 0
                        }
                        borderColor="lightgrey"
                        pb={4}
                        pt={4}
                      >
                        <Typography variant="h4">
                          {/* Week {list?.week}  */}
                          Day {list?.day}
                        </Typography>
                        <Typography variant="h5">
                          {list?.workout?.name ?? "Rest Day"}
                        </Typography>
                        {list?.workout?.exercises &&
                          list?.workout?.exercises.length > 0 && (
                            <div>
                              {list.workout.exercises.map((exercise, index) => (
                                <div key={index}>
                                  <div>
                                    {exercise?.order}. {exercise?.name}{" "}
                                    {exercise?.sets} x {exercise?.reps}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                      </Box>
                    ))}
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </>
  );
}
