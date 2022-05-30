import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listExercises } from "../../src/graphql/queries";
import {
  Grid,
  Chip,
  Fab,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import AddExercise from "./addexercise";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VideoDialog from "../videoDialog";

export default function Exercises() {
  const [exercises, setExercises] = useState();
  const [editExercise, setEditExercise] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [filtered, setFiltered] = useState();
  const [filter, setFilter] = useState();
  const [filterList, setFilterList] = useState();

  useEffect(() => {
    getExerciseList();
  }, []);

  useEffect(() => {
    if (exercises && exercises.length > 0) {
      const filtered = exercises.filter(
        (x) => x.bodypart === filter || x.muscles === filter,
      );
      setFiltered(filtered);
    }
  }, [filter, exercises]);

  const updateExeriseList = (data) => {
    if (data) {
      const exercise = exercises.find((x) => x.id === data?.id);
      if (exercise) {
        //replace in list
        const newset = exercises.map((x) => {
          if (x.id === data?.id) return data;
          else return x;
        });
        setExercises(newset);
      } else setExercises([...exercises, data]);
      const muscles = data?.muscles;
      if (muscles) setFilter(muscles);
      setShowAdd(false);
    }
  };

  async function getExerciseList() {
    try {
      const { data } = await API.graphql({
        query: listExercises,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listExercises?.items;
      setExercises(items);
      let filterlist = new Set();
      items.map((x) => {
        filterlist.add(x.muscles);
      });
      setFilterList([...filterlist]);
    } catch (error) {
      console.warn("Error with api getProfile", error);
    }
  }

  const list = filtered ? filtered : exercises;
  return (
    <>
      {!showAdd ? <h1>Exercise List</h1> : <h1>Add Exercise</h1>}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setShowAdd(!showAdd)}
        sx={{ mb: 3 }}
      >
        {!showAdd ? <AddIcon /> : <CloseIcon />}
      </Fab>
      {showAdd ? (
        <AddExercise
          setShowAdd={setShowAdd}
          showAdd={showAdd}
          updateExeriseList={updateExeriseList}
          exercise={editExercise}
        />
      ) : (
        <>
          <Grid container direction="column" justifyContent="center">
            <Grid item>
              {(filterList || []).map((x) => (
                <Chip
                  sx={{ textTransform: "uppercase", margin: 0.6 }}
                  label={x}
                  onClick={() => setFilter(x)}
                  color="default"
                  size="small"
                  variant={filter === x ? "filled" : "outlined"}
                />
              ))}
            </Grid>
          </Grid>
          <List>
            {(list ?? []).map((x, index) => {
              return (
                <ListItem
                  secondaryAction={
                    <>
                      {x?.video && <VideoDialog videoSource={""} />}
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="delete">
                        <EditIcon
                          onClick={() => {
                            setShowAdd(!showAdd);
                            setEditExercise(x);
                          }}
                        />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText
                    primary={x?.name}
                    secondary={x?.instructions && x?.instructions}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </>
  );
}
