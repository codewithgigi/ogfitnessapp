import React, { useEffect, useState, useContext } from "react";
import { API } from "aws-amplify";
import {
  Card,
  Box,
  Grid,
  CardContent,
  CardMedia,
  Divider,
  Chip,
  Button,
  Typography,
} from "@mui/material";
import VideoDialog from "../../components/videoDialog";

import { palette } from "../../src/theme";
import { formatDate } from "../../lib/formatDate";
// import { getTrainingPlans } from "../../lib/api/trainingPlans";
import PlayCircleIcon from "@mui/icons-material/PlayCircleOutlineTwoTone";

import { useRouter } from "next/router";

import Section from "../../components/Section";
import SectionHeader from "../../components/SectionHeader";
import Context from "../../src/context";
import { ExerciseList } from "../../components/exerciseList";
import CompleteWorkoutDialog from "../../components/completeWorkoutDialog";

export const listPrograms = /* GraphQL */ `
  query ListPrograms(
    $filter: ModelProgramFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        subtitle
        duration
        description
        instructions
        active
        goal
        gender
        age
        level
        weeks
        workoutList {
          id
          name
          instructions
          day
          week
          warmup {
            instructions
          }
          cooldown {
            instructions
          }
          exercises {
            name
            sets
            reps
          }
        }
      }
      nextToken
    }
  }
`;

export const updateProfileResults = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
      id
      user
      email
      onboarding {
        goal
        gender
        age
        experience
        compete
        competeLevel
      }
      weight {
        weight
        date
      }
      progressPhotos {
        frontImage
        sideImage
        backImage
        date
      }
      workoutResults {
        workoutId
        date
        notes
      }
      exerciseResults {
        exerciseId
        date
        notes
      }
      createdAt
      updatedAt
    }
  }
`;

const ViewPrograms = ({ profile, programs }) => {
  const router = useRouter();
  return (
    <Section title={"Training Plans"}>
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
      {(programs || []).map((program, index) => (
        <Card
          key={index}
          elevation={0}
          sx={{
            display: "flex",
            backgroundColor: palette.lightgrey,
            padding: 1,
          }}
          onClick={() => {
            router.push(`/training/${program?.id}`);
          }}
        >
          <CardMedia
            component="img"
            image={`/assets/fat-loss-female-${index + 1}.png`}
            alt={program?.name}
            sx={{ width: "40%", borderRadius: 1, objectFit: "cover" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography variant="h4"> {program?.name}</Typography>
              <Typography variant="subtitle1">{program?.subtitle}</Typography>
              <Typography sx={{ color: palette.blue }} variant="body2">
                view plan
              </Typography>
            </CardContent>
          </Box>
        </Card>
      ))}
    </Section>
  );
};

const ProgramDetail = ({ program }) => {
  const router = useRouter();

  return (
    <Section title={program?.name} subtitle={program?.subtitle} goBack={true}>
      <Box
        sx={{
          backgroundColor: palette.lightestgrey,
          border: ".5px solid lightgrey",
          borderRadius: 2,
          cursor: "pointer",
        }}
      >
        {(program?.workoutList || []).map((workout, index) => {
          return (
            <Box
              key={index}
              onClick={() => {
                router.push(`/training/${program?.id}/${workout?.id}`);
              }}
            >
              <Grid
                container
                spacing={1}
                sx={{
                  padding: 2,
                }}
                alignItems="flex-start"
                key={index}
              >
                <Grid item>
                  <Chip
                    label={`Day ${workout?.day}`}
                    sx={{ cursor: "pointer" }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    {workout?.name}
                    <span style={{ color: palette.blue, fontSize: ".9rem" }}>
                      {"  "}
                      view
                    </span>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {workout?.instructions}
                  </Typography>
                </Grid>
              </Grid>
              {index < program?.workoutList.length - 1 && <Divider />}
            </Box>
          );
        })}
      </Box>
    </Section>
  );
};

const WorkoutDetail = ({ workout, updateProfile }) => {
  const { state } = useContext(Context);

  useEffect(() => {
    if (workout?.exercises) {
      const exercise = workout?.exercises[0];
      if (!exercise.video) exercise.video = "assets/exercise/squat.mp4";
    }
  }, []);

  return (
    <Section
      title={workout?.name}
      subtitle={`Day ${workout?.day}`}
      goBack={true}
    >
      <Box sx={{ backgroundColor: palette.lightestgrey, padding: 1 }}>
        {workout?.instructions && (
          <Typography variant="body1" gutterBottom>
            {workout?.instructions}
          </Typography>
        )}
        {workout?.warmup && (
          <Box justifyContent={"space-between"}>
            <Typography variant="h5" gutterBottom>
              <VideoDialog
                color={true}
                item={{
                  name: "warmup",
                  video: workout?.warmup?.video,
                  instructions: workout?.warmup?.instructions,
                }}
              />
              Warmup
            </Typography>
            <Typography variant="caption" gutterBottom>
              {workout?.warmup?.instructions}
            </Typography>
            <Divider />
          </Box>
        )}
        {workout?.exercises && (
          <>
            {/* <Typography variant="h5" sx={{ border: "1px solid black" }}>
              Workout
            </Typography> */}
            {workout?.exercises && workout?.exercises.length > 0 && (
              <ExerciseList
                list={workout?.exercises}
                updateProfile={updateProfile}
                profile={state?.user?.profile}
              />
            )}
          </>
        )}
        {workout?.cooldown && (
          <Box display="flex">
            <Divider />
            <Typography variant="h5" gutterBottom>
              <VideoDialog
                color={true}
                item={{
                  name: workout?.cooldown?.name,
                  instructions: workout?.cooldow?.instructions,
                  video: workout?.cooldown?.video,
                }}
              />
              Cooldown
            </Typography>
            <Typography variant="caption" gutterBottom>
              {workout?.cooldown?.instructions}
            </Typography>
          </Box>
        )}
        <CompleteWorkoutDialog item={workout} updateProfile={updateProfile} />
        {state?.user?.profile?.workoutResults && (
          <Typography variant="h5" mt={1}>
            Comments
          </Typography>
        )}
        {(state?.user?.profile?.workoutResults || []).map((results, index) => {
          if (results?.workoutId === workout?.id)
            return (
              <Box key={index}>
                <Typography variant="caption" sx={{ color: "green" }}>
                  {formatDate(results?.date)}: {results?.notes}
                </Typography>
              </Box>
            );
        })}
      </Box>
    </Section>
  );
};

export default function MyPlan() {
  const { state, dispatch } = useContext(Context);
  const [programs, setPrograms] = useState();
  const [viewPlan, setViewPlan] = useState();
  const [viewWorkout, setViewWorkout] = useState();
  const router = useRouter();

  useEffect(() => {
    if (state?.user?.profile?.onboarding) getPrograms();
  }, [state?.user?.profile?.onboarding]);

  async function getPrograms() {
    let {
      goal = "",
      experience = "",
      gender = "",
      age = "",
    } = state?.user?.profile?.onboarding ?? {};
    const variables = {};
    let filter = {};
    if (goal) filter.goal = { contains: goal };
    if (experience) filter.level = { contains: experience };
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
      setPrograms(items);
    } catch (error) {
      console.log("Error with api listWorkouts", error);
    }
  }

  useEffect(() => {
    if (!router?.query?.slug) {
      setViewPlan();
      setViewWorkout();
    }
    if (router?.query?.slug && programs && programs.length > 0) {
      const [planId, workoutId] = router.query.slug;
      const plan = (programs || []).find((x) => x.id === planId);
      if (!workoutId) setViewWorkout();
      if (planId && plan) setViewPlan(plan);
      if (workoutId && plan) {
        const workout = (plan?.workoutList || []).find(
          (x) => x.id === workoutId,
        );
        setViewWorkout(workout);
      }
    }
  }, [router?.query, programs]);

  async function updateProfile(data) {
    const profileId = state?.user?.profile?.id;
    let newDate = new Date(data?.date ?? "");
    var dd = String(newDate.getDate()).padStart(2, "0");
    var mm = String(newDate.getMonth() + 1).padStart(2, "0");
    var yyyy = newDate.getFullYear();
    //awsDateformat string in the format YYYY-MM-DD
    data.date = `${yyyy}-${mm}-${dd}`;
    let variables = { id: profileId };

    if (data?.exerciseId) {
      const currentResults = state?.user?.profile?.exerciseResults ?? [];
      let exerciseResults = [...currentResults, data];
      variables.exerciseResults = exerciseResults;
    }
    if (data?.workoutId) {
      const currentResults = state?.user?.profile?.workoutResults ?? [];
      let workoutResults = [...currentResults, data];
      variables.workoutResults = workoutResults;
    }
    if (profileId)
      try {
        const results = await API.graphql({
          query: updateProfileResults,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: variables,
          },
        });
        const newUser = {
          ...state.user,
          profile: results?.data?.updateProfile,
        };
        dispatch({ type: "addUser", payload: newUser });
      } catch (error) {
        console.log("udpate profile eror results", error);
      }
  }

  const profile = state?.user?.profile ?? null;

  if (viewPlan && !viewWorkout) return <ProgramDetail program={viewPlan} />;
  else if (viewWorkout)
    return (
      <WorkoutDetail workout={viewWorkout} updateProfile={updateProfile} />
    );
  else return <ViewPrograms profile={profile} programs={programs} />;
}
