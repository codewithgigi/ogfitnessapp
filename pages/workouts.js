import React, { useEffect } from "react";
import { API } from "aws-amplify";
import {
  Card,
  Box,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";
import Section from "../components/Section";
import Context from "../src/context";

const workoutPlans = [
  {
    id: 1,
    goal: "Lose Fat / Get Lean",
    name: "Get Lean Circuits",
    length: 12,
    levels: 3,
    level: "beginner",
    description: "circuit training workouts",
    equipment: "Full gym",
    workouts: ["month1", "month1", "month1"],
  },
  {
    id: 2,
    goal: "Lose Fat / Get Lean",
    name: "Get Lean Bodyweight",
    length: 12,
    levels: 3,
    level: "beginner",
    description: "circuit training workouts",
    equipment: "Bodyweight",
  },
  {
    id: 3,
    goal: "Lose Fat / Get Lean",
    name: "6 week get lean",
    levels: 3,
    level: "beginner",
    description: "circuit training workouts",
    equipment: "Dumbells/resistance bands",
  },

  {
    id: 4,
    goal: "Gain Weight/Muscle",
    name: "6 Week Build Muscle",
    levels: 3,
    level: 1,
    description: "4 days/week Upper/Lower body split",
    equipment: "Full Gym",
  },
  {
    id: 5,
    goal: "Gain Weight/Muscle",
    name: "Build Muscle Garage Gym",
    levels: 3,
    level: 1,
    description: "6 days/week, Bodypart Split Workouts",
    equipment: "Dumbells, Barbell and weights, pull up bar, bench, Box",
  },
];

export default function Workouts() {
  const { state } = React.useContext(Context);
  const router = useRouter();

  const workoutByGoal = workoutPlans.filter(
    (x) => x.goal === state?.user?.profile?.onboarding?.goal,
  );

  const card = (x) => (
    <Card>
      <CardContent>
        <h2>{x?.name}</h2>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {x?.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Goal: {x?.goal}
        </Typography>
        <Typography color="text.secondary">
          {" "}
          Equipment: {x?.equipment}{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Goto Plan</Button>
      </CardActions>
    </Card>
  );
  const profile = state?.user?.profile ?? null;

  return (
    <Section>
      <h1 className={styles.title}>Workouts</h1>

      <p>
        Goal: {profile?.onboarding?.goal}
        {profile?.onboarding?.compete
          ? `Compete in ${profile?.onboarding?.compete}`
          : profile?.onboarding?.goal}
        <Button size="small" onClick={() => router.push("/onboarding")}>
          Change Goal
        </Button>
      </p>
      {profile?.onboarding?.compete && (
        <Box>
          <p>
            {profile?.onboarding?.goal} {profile?.onboarding?.compete} Workouts
            are being created by Oksana. We will contact you when these are
            ready.
          </p>
          <p>Try one of the workouts below in the meantime.</p>
          <Grid container flexDirection={"column"}>
            {(workoutPlans || []).map((x, index) => (
              <Box key={index} sx={{ mb: 2, maxWidth: 320 }}>
                {card(x)}
              </Box>
            ))}
          </Grid>
        </Box>
      )}
      <Grid container flexDirection={"column"}>
        {(workoutByGoal || []).map((x, index) => (
          <Box key={index} sx={{ mb: 2, maxWidth: 320 }}>
            {card(x)}
          </Box>
        ))}
      </Grid>
    </Section>
  );
}
