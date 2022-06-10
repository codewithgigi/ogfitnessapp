import React, { useEffect, useState } from "react";
import { API, Storage } from "aws-amplify";
import { listExercises } from "../../src/graphql/queries";
import { deleteExercise } from "../../src/graphql/mutations";
import { Grid, Chip, Fab, Divider, Box, Typography } from "@mui/material";
import AddExercise from "./addexercise";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import VideoDialog from "../videoDialog";
import DeleteDialog from "../deleteDialog";

export const getStorageFiles = async (items) => {
  let newItems = await Promise.all(
    (newItems = items.map(async (item) => {
      try {
        if (item.image && !item?.imageSource) {
          const result = await Storage.get(item?.image, {
            download: false,
          });
          item.imageSource = result;
        }
        if (item.video && !item?.videoSource)
          item.videoSource = await Storage.get(item?.video, {
            download: false,
          });
      } catch (error) {
        console.log("getImage error", error);
      }
      return item;
    })),
  );
  return newItems;
};

export const ExerciseList = ({ list, removeExercise = null }) => {
  return (list ?? []).map((x, index) => (
    <Grid container alignItems={"center"} key={index} direction="row" mt={2}>
      <Grid item key={index}>
        {x?.imageSource && (
          <div class="container">
            <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
              {x?.name}
              <br />
              {x?.order} {x?.sets} {x?.reps}
            </Typography>
            <img
              src={x?.imageSource}
              style={{
                height: 80,
                width: 120,
                objectFit: "cover",
              }}
            />
            <div className="play-button">
              {x?.video && x?.videoSource && <VideoDialog item={x} />}
            </div>
          </div>
        )}
      </Grid>
      <Grid item>
        <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
          {x?.order} {x?.sets} {x?.reps}
        </Typography>
      </Grid>
      {removeExercise && (
        <Grid item>
          <DeleteDialog removeItem={removeExercise} item={x} />
        </Grid>
      )}

      <Divider />
    </Grid>
  ));
};
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

  const removeExercise = async (x) => {
    if (x) {
      try {
        await API.graphql({
          query: deleteExercise,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: { input: { id: x?.id } },
        });
        //remove videos and images as well
        if (x?.image) await Storage.remove(x?.image);
        if (x?.video) await Storage.remove(x?.video);
        const newset = exercises.filter((e) => e.id !== x?.id);
        setExercises(newset);
        setFilter();
        setFiltered();
      } catch (error) {
        console.log("error in delete exercise", error);
      }
    }
  };

  const updateExeriseList = async (data) => {
    if (data) {
      const exercise = exercises.find((x) => x.id === data?.id);
      try {
        if (data?.image) {
          const result = await Storage.get(data?.image, {
            download: false,
          });
          data.imageSource = result;
        }
        if (data?.video)
          data.videoSource = await Storage.get(data?.video, {
            download: false,
          });
        if (!exercise) setExercises([...exercises, data]);
        else {
          const newset = exercises.map((x) => {
            if (x.id === data?.id) return data;
            else return x;
          });
          setExercises(newset);
        }
        const muscles = data?.muscles;
        if (muscles) setFilter(muscles);
        setShowAdd(false);
      } catch (error) {
        console.log("getImage error", error);
      }
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
            <Grid item mt={4}>
              <ExerciseList list={list} removeExercise={removeExercise} />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
