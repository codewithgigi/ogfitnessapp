import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import Section from "./Section";
import { ExerciseList } from "./admin/exercises";
import { useRouter } from "next/router";

export default function Workout({ workout, planId }) {
  const router = useRouter();

  return (
    <Section>
      <Button onClick={() => router.push(`/trainingplans?planId=${planId}`)}>
        Back to Workouts
      </Button>
      <Typography variant="h2">Workout - {workout?.workout?.name}</Typography>
      <Typography variant="paragraph">
        {workout?.workout?.instructions}
      </Typography>
      {workout?.workout?.exercises &&
        workout?.workout?.exercises.length > 0 && (
          <ExerciseList list={workout?.workout?.exercises} />
        )}
    </Section>
  );
}
