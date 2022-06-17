import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import Section from "./Section";
import { getStorageFiles, ExerciseList } from "./admin/exercises";
import { useRouter } from "next/router";

export default function Workout({ workout, planId }) {
  const [exerciseList, setExersiseList] = useState();
  const router = useRouter();

  useEffect(() => {
    getImages();
  }, [workout?.workout?.exercises]);

  const getImages = async () => {
    const exercises = workout?.workout?.exercises;
    let newList;
    if (exercises && exercises.length > 0) {
      newList = await getStorageFiles(exercises);
      setExersiseList(newList);
    }
  };
  return (
    <Section>
      <Button onClick={() => router.push(`/trainingplans?planId=${planId}`)}>
        Back to Workouts
      </Button>
      <Typography variant="h2">Workout - {workout?.workout?.name}</Typography>
      <Typography variant="paragraph">
        {workout?.workout?.instructions}
      </Typography>
      {exerciseList && exerciseList.length > 0 && (
        <ExerciseList list={exerciseList} />
      )}
    </Section>
  );
}
