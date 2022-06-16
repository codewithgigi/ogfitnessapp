import React, { useEffect, useState, useContext } from "react";
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

import Section from "../../components/Section";
import Context from "../../src/context";
import { getStorageFiles } from "../../components/admin/exercises";

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
          workoutId
          workoutName
          workoutDescription
        }
      }
      nextToken
    }
  }
`;

export default function MyPlan() {
  const { state } = useContext(Context);
  const [programs, setPrograms] = useState();
  const [viewPlan, setViewPlan] = useState();
  const router = useRouter();

  useEffect(() => {
    getProgramList();
  }, [state?.user?.profile?.onboarding]);

  useEffect(() => {
    if (router?.query?.planId) {
      const plan = (programs || []).find((x) => x.id === router?.query?.planId);
      setViewPlan(plan);
    } else setViewPlan();
  }, [router?.query?.planId, programs]);

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
        <Typography variant="h2">{x?.name}</Typography>
        <Typography variant="h3">{x?.weeks} Week Program</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {x?.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Goal: {x?.goal}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() =>
            router.push({
              pathname: "/trainingplans",
              query: { planId: x?.id },
            })
          }
        >
          View Plan
        </Button>
      </CardActions>
    </Card>
  );
  const profile = state?.user?.profile ?? null;

  const renderWeeks = () => {
    const weeks = [];

    for (const week = 1; week <= viewPlan?.weeks; week++) {
      weeks.push(
        <Box>
          <div>Week {week + 1}</div>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => {
            const workout = (viewPlan.workoutList || []).find(
              (list) => list?.day === day && list?.week === week,
            );
            return (
              <div>
                day: {day}
                {workout?.workoutName}
                {workout?.workoutDescription}
              </div>
            );
          })}
        </Box>,
      );
    }
    return <div>{weeks}</div>;
  };
  if (viewPlan)
    return (
      <Section>
        <Button onClick={() => router.push("/trainingplans")}>All Plans</Button>
        <Typography variant="h2">{viewPlan?.name}</Typography>
        <Typography variant="h3">{viewPlan?.weeks} Week Program</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {viewPlan?.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Goal: {viewPlan?.goal}
        </Typography>
        <div>{renderWeeks()}</div>
      </Section>
    );
  return (
    <Section>
      <Typography variant="h1">Training Plans</Typography>

      <p>
        {profile?.onboarding?.compete
          ? `Compete in ${profile?.onboarding?.compete}`
          : `Goal: ${profile?.onboarding?.goal}`}
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
          <div>
            <Box key={index} sx={{ mb: 2, maxWidth: 320 }}>
              {card(x)}
            </Box>

            {x.workoutList.type}
            {/* {(x.workoutList || []).map((w) => (
              <div>
                {getWorkoutWeekInList(w)}
                Week {index + 1} Day: {w?.day} {w?.type}
              </div>
            ))} */}
          </div>
        ))}
      </Grid>
    </Section>
  );
}
