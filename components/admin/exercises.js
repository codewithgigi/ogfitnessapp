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
  Divider,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import AddExercise from "./addexercise";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PlayIcon from "@mui/icons-material/PlayCircle";
import EditIcon from "@mui/icons-material/Edit";
import VideoDialog from "../videoDialog";

export default function Exercises() {
  const [exercises, setExercises] = useState();
  const [editExercise, setEditExercise] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [filtered, setFiltered] = useState();
  const [filter, setFilter] = useState(filter);
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

  const updateExeriseList = async (data) => {
    if (data) {
      const exercise = exercises.find((x) => x.id === data?.id);
      if (exercise) {
        try {
          if (data.image) {
            const result = await Storage.get(data?.image, {
              download: false,
            });
            data.imageSource = result;
          }
          if (data.video)
            data.videoSource = await Storage.get(data?.video, {
              download: false,
            });

          const newset = exercises.map((x) => {
            if (x.id === data?.id) return data;
            else return x;
          });
          setExercises(newset);
          const muscles = data?.muscles;
          if (muscles) setFilter(muscles);
          setShowAdd(false);
        } catch (error) {
          console.log("getImage error", error);
        }
      } else setExercises([...exercises, data]);
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
              const result = await Storage.get(item?.image, {
                download: false,
              });
              item.imageSource = result;
            }
            if (item.video)
              item.videoSource = await Storage.get(item?.video, {
                download: false,
              });
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
              <Chip
                sx={{ textTransform: "uppercase", margin: 0.6 }}
                label={"All"}
                onClick={() => setFilter()}
                color="default"
                size="small"
                variant={!filter ? "filled" : "outlined"}
              />
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
          {(list ?? []).map((x, index) => (
            <Grid container direction="column">
              <Grid item key={index} mt={2} mb={1}>
                <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                  {x?.name}
                </Typography>
              </Grid>
              <Grid item key={index}>
                {x?.imageSource && (
                  <div class="container">
                    <img
                      src={x?.imageSource}
                      style={{
                        height: 80,
                        width: 120,
                        objectFit: "cover",
                      }}
                    />
                    <div className="play-button">
                      {x?.video && (
                        <VideoDialog
                          exercise={x}
                          updateExeriseList={updateExeriseList}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Grid>
              <Divider />
            </Grid>
          ))}
        </>
      )}
    </>
  );
}
