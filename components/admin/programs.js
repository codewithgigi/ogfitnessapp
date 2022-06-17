import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
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
import AddProgram from "./addProgram";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
          type
          workoutName
          workoutDescription
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
      console.log("data", data);
      const items = data?.listPrograms?.items;
      //let newItems = await getStorageFiles(items);
      console.log("new items", items);
      //get image
      // let itemsImages = await Promise.all(
      //   newItems.map(async (item) => {
      //     try {
      //       let items = await getStorageFiles(item?.workoutList);
      //       item.workoutList = items;
      //       return item;
      //     } catch (error) {
      //       console.log("error getting workout images");
      //     }
      //   }),
      // );
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
        //remove videos and images as well
        //ToDO:  make sure this workout is not in any programs first
        // if (x?.image) await Storage.remove(x?.image);
        // if (x?.video) await Storage.remove(x?.video);
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
      <div>programs</div>
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
                {x?.workoutList && x?.workoutList.length > 0 && (
                  <Typography sx={{ color: "text.secondary" }}>
                    {x?.name}
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      )}
    </>
  );
}
