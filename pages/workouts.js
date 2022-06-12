import React, { useEffect, useState, useContext } from "react";
import { API, Storage } from "aws-amplify";
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
import { listPrograms } from "../src/graphql/queries";
import { getStorageFiles } from "../components/admin/exercises";

export default function Workouts() {
  const { state } = useContext(Context);
  const [programs, setPrograms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log("changes profile");
    getProgramList();
  }, [state?.user?.profile?.onboarding]);

  async function getProgramList() {
    let {
      goal = "",
      level = "",
      gender = "",
      age = "",
    } = state?.user?.profile?.onboarding ?? {};
    const variables = { limit: 300 };
    let filter = {};
    if (goal) filter.goal = { contains: goal };
    if (level) filter.level = { contains: level };
    if (age) filter.age = { contains: age };
    if (gender) filter.gender = { contains: gender };
    variables.filter = filter;
    try {
      const { data } = await API.graphql({
        query: listPrograms,
        variables: variables,
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      const items = data?.listPrograms?.items;
      let newItems = await getStorageFiles(items);
      setPrograms(newItems);
    } catch (error) {
      console.log("Error with api listWorkouts", error);
    }
  }

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
            are not available yet. Click here to get a custom plan. Or click
            here to{" "}
            <Button size="small" onClick={() => router.push("/onboarding")}>
              Change Goal
            </Button>
          </p>
        </Box>
      )}
      <Grid container flexDirection={"column"}>
        {(programs || []).map((x, index) => (
          <Box key={index} sx={{ mb: 2, maxWidth: 320 }}>
            {card(x)}
          </Box>
        ))}
      </Grid>
    </Section>
  );
}
