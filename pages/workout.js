import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { getWorkout } from "../src/graphql/queries";
import {
  Box,
  Fab,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useRouter } from "next/router";
import Section from "../components/Section";
import { getStorageFiles, ExerciseList } from "../components/admin/exercises";

export default function Workout() {
  const [workout, setWorkout] = useState();
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.id) findWorkout(router?.query?.id);
  }, [router?.query?.id]);

  async function findWorkout(id) {
    try {
      const { data } = await API.graphql({
        query: getWorkout,
        variables: { id: id },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const item = data?.getWorkout;
      let itemImages = await getStorageFiles(item?.exercises);
      item.exercises = itemImages;
      setWorkout(item);
    } catch (error) {
      console.warn("Error with api listWorkouts", error);
    }
  }

  return (
    <Section>
      <Typography variant="h2">Workout {workout?.name}</Typography>
      {workout?.exercises && workout?.exercises.length > 0 && (
        <ExerciseList list={workout?.exercises} />
      )}
    </Section>
  );
}
