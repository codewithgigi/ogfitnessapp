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
import Workout from "../../components/workout";

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
          workout {
            id
            name
            instructions
            exercises {
              id
              name
              muscles
              bodypart
              equipment
              instructions
              image
              video
              sets
              reps
              order
            }
          }
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
  const [viewWorkout, setViewWorkout] = useState();
  const router = useRouter();

  useEffect(() => {
    getProgramList();
  }, []);

  useEffect(() => {
    if (router?.query?.planId) {
      const plan = (programs || []).find((x) => x.id === router?.query?.planId);
      setViewPlan(plan);
    } else setViewPlan();
  }, [router?.query?.planId, programs]);

  useEffect(() => {
    if (router?.query?.workoutId) {
      const plan = (programs || []).find((x) => x.id === router?.query?.planId);
      const workout = (plan?.workoutList || []).find(
        (w) => w.workout.id === router?.query?.workoutId,
      );
      setViewWorkout(workout);
    } else setViewWorkout();
  }, [router?.query?.workoutId, programs]);

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
        {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Goal: {x?.goal}
        </Typography> */}
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
        <>
          <Typography variant="h2">Week {week}</Typography>
          <Box
            border={1}
            borderColor="lightgrey"
            borderRadius={2}
            boxShadow={1}
            mb={4}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const workout = (viewPlan.workoutList || []).find(
                (list) => list?.day === day && list?.week === week,
              );
              return (
                <Box
                  key={day}
                  p={1}
                  mb={1}
                  mt={1}
                  borderBottom={day !== 7 ? 1 : 0}
                  borderColor="lightgrey"
                >
                  <Grid container direction={"row"}>
                    <Grid item xs={2}>
                      <Typography variant="h5"> Day {day} </Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography
                        variant="body"
                        sx={{ textTransform: "capitalize", ml: 1 }}
                      >
                        {workout?.workout?.name ?? "Rest Day"}
                      </Typography>
                    </Grid>
                    {workout?.workout?.id && (
                      <Grid item xs={2}>
                        <Button
                          size="small"
                          onClick={() =>
                            router.push({
                              pathname: "/trainingplans",
                              query: {
                                planId: viewPlan?.id,
                                workoutId: workout?.workout?.id,
                              },
                            })
                          }
                        >
                          View
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              );
            })}
          </Box>
        </>,
      );
    }
    return <div>{weeks}</div>;
  };
  console.log("viewworkout", viewWorkout);
  if (viewWorkout) {
    return <Workout workout={viewWorkout} />;
  } else if (viewPlan)
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
        <Box>{renderWeeks()}</Box>
      </Section>
    );
  else
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
              {profile?.onboarding?.goal} {profile?.onboarding?.compete}{" "}
              Workouts are not available yet. Click here to get a custom plan.
              Or click here to{" "}
              <Button size="small" onClick={() => router.push("/onboarding")}>
                Change Goal
              </Button>
            </p>
          </Box>
        )}
        <Grid container flexDirection={"column"}>
          {(programs || []).map((x, index) => (
            <div key={index}>
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
