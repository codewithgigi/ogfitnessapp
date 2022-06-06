import React, { useEffect, useState } from "react";
import { API, Storage } from "aws-amplify";
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
import { Image, AmplifyS3Image } from "@aws-amplify/ui-react";

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
    console.log("update list", data);
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
    // Storage.list("public/") // for listing ALL files without prefix, pass '' instead
    //   .then((result) => console.log("get list of images", result))
    //   .catch((err) => console.log("error in list", err));
    try {
      const { data } = await API.graphql({
        query: listExercises,
        variables: { limit: 300 },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listExercises?.items;
      const newItems = await getStorageFiles(items);
      setExercises(newItems);
      let filterlist = new Set();
      newItems.map((x) => {
        filterlist.add(x.muscles);
      });
      setFilterList([...filterlist]);
    } catch (error) {
      console.warn("Error with api getProfile", error);
    }
  }

  const getStorageFiles = async (items) => {
    let newItems = await Promise.all(
      (newItems = items.map(async (item) => {
        if (item.image) {
          try {
            if (item.image) {
              const result = await Storage.get(item?.image);
              item.imageSource = result;
            }
            if (item.video) item.videoSource = await Storage.get(item?.video);
          } catch (error) {
            console.log("getImage error", error);
          }
        }
        return item;
      })),
    );
    return newItems;
  };

  const list = filter ? filtered : exercises;
  console.log("exercise", exercises, list);
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
                  key={x}
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
                <div key={index}>
                  {x?.imageSource && (
                    <div>
                      <a href={x.imageSource} target="_blank">
                        {x?.name}
                      </a>
                      <img
                        src={x?.imageSource}
                        style={{
                          height: 200,
                          width: 200,
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                  {x?.videoSource && (
                    <div>
                      <video controls width="250">
                        <source src={x?.videoSource} type="video/mp4" />
                        Sorry, your browser doesn't support embedded videos.
                      </video>
                    </div>
                  )}
                  <ListItem
                    secondaryAction={
                      <>
                        {x?.video && (
                          <VideoDialog
                            exercise={x}
                            updateExeriseList={updateExeriseList}
                          />
                        )}
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            setShowAdd(!showAdd);
                            setEditExercise(x);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText
                      primary={x?.name}
                      secondary={x?.instructions && x?.instructions}
                    />
                  </ListItem>
                </div>
              );
            })}
          </List>
        </>
      )}
    </>
  );
}
