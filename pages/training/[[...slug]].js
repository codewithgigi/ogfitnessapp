import React, { useEffect, useState, useContext } from "react";
import { API } from "aws-amplify";
import {
  Card,
  Box,
  Grid,
  CardContent,
  CardMedia,
  Divider,
  Button,
  Typography,
} from "@mui/material";

import { palette } from "../../src/theme";
import { formatDate } from "../../lib/formatDate";
import { getTrainingPlans } from "../../lib/api/trainingPlans";
import PlayCircleIcon from "@mui/icons-material/PlayCircleOutlineTwoTone";

import { useRouter } from "next/router";

import Section from "../../components/Section";
import Context from "../../src/context";
import { ExerciseList } from "../../components/exerciseList";
import CompleteWorkoutDialog from "../../components/completeWorkoutDialog";

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
      <Grid container direction="row" spacing={1}>
        {(programs || []).map((program, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Card
              onClick={() =>
                router.push({
                  pathname: `/training/${program?.id}`,
                })
              }
            >
              <CardMedia
                component="img"
                image={`/assets/fat-loss-female-${index + 1}.png`}
                alt={program?.name}
                sx={{ height: 110 }}
              />
              <CardContent>
                <Typography variant="h4"> {program?.name}</Typography>
                <Typography variant="subtitle1">{program?.subtitle}</Typography>
                <Typography variant="body2">{program?.duration}</Typography>
              </CardContent>
            </Card>
            {program.workoutList?.type}
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

const ProgramDetail = ({ program, day, setDay }) => {
  const router = useRouter();

  return (
    <Section title={program?.name} subtitle={program?.subtitle} goBack={true}>
      <Box
        justifyContent={"center"}
        display="flex"
        alignItems="center"
        sx={{ color: palette.blue, fontSize: 14 }}
      ></Box>
      <Box mt={2}>
        <Box>
          {[1, 2, 3, 4, 5, 6, 7].map((label, index) => {
            const workoutsByDay = (program.workoutList || []).filter((list) => {
              if (list?.day === label) {
                return list;
              }
            });
            return (
              <Box key={index}>
                <Card
                  sx={{
                    backgroundColor: "white",
                    padding: 1,
                    marginBottom: 1,
                  }}
                >
                  <Typography variant="h4" align="center">
                    Day {label} {workoutsByDay.length <= 0 ? " - Rest Day" : ""}
                  </Typography>
                  {(workoutsByDay || []).map((workout, i) => (
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{
                          textTransform: "capitalize",
                        }}
                        onClick={() => {
                          setDay(workout?.day);
                          router.push(
                            `/training/${program?.id}/${workout?.id}`,
                          );
                        }}
                      >
                        {workout?.name}
                      </Typography>

                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {workout?.instructions}
                      </Typography>
                      {i < workoutsByDay.length - 1 && (
                        <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
                      )}
                    </Box>
                  ))}
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Section>
  );
};

const WorkoutDetail = ({ workout, updateProfile }) => {
  const { state } = useContext(Context);
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (workout?.exercises) {
      const exercise = workout?.exercises[0];
      if (!exercise.video) exercise.video = "assets/exercise/squat.mp4";
      setSelected(exercise);
    }
  }, []);

  return (
    <Section
      title={workout?.name}
      subtitle={`Day ${workout?.day}`}
      goBack={true}
    >
      <Card>
        <CardContent>
          {selected && (
            <video controls width="100%" controlsList="nodownload">
              <source src={`/${selected?.video}`} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
          )}
          <Typography
            sx={{ color: "text.secondary", textTransform: "capitalize" }}
          >
            {selected?.name}{" "}
            {selected?.sets && `${selected?.sets} X ${selected?.reps}`}
          </Typography>
          <Typography
            sx={{ color: "text.secondary", textTransform: "capitalize" }}
          >
            {selected?.instructions}
          </Typography>
          <Divider sx={{ marginTop: 2 }} />
          {workout?.instructions && (
            <Typography variant="body1" gutterBottom>
              {workout?.instructions}
            </Typography>
          )}
          {workout?.warmup && (
            <Box display="flex" justifyContent={"space-between"}>
              <Typography variant="h5" gutterBottom>
                Warmup
              </Typography>
              <Button
                onClick={() => {
                  setSelected({
                    name: "warmup",
                    instructions: workout?.warmup?.instructions,
                    video:
                      workout?.warmup?.video ?? "assets/exercise/squat.mp4",
                  });
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }}
                sx={{ marginRight: 1, padding: 0 }}
              >
                <PlayCircleIcon
                  fontSize={"large"}
                  sx={{
                    color: palette.green,
                  }}
                  className="playbutton"
                />
              </Button>
            </Box>
          )}
          {workout?.exercises && (
            <>
              <Typography variant="h5" gutterBottom>
                Workout
              </Typography>
              {workout?.exercises && workout?.exercises.length > 0 && (
                <ExerciseList
                  list={workout?.exercises}
                  updateProfile={updateProfile}
                  profile={state?.user?.profile}
                  setSelected={setSelected}
                />
              )}
            </>
          )}
          {workout?.cooldown && (
            <Box display="flex" justifyContent={"space-between"}>
              <Typography variant="h5" gutterBottom>
                Cooldown
              </Typography>
              <Button
                onClick={() => {
                  setSelected({
                    name: "cooldown",
                    instructions: workout?.cooldown?.instructions,
                    video:
                      workout?.cooldown?.video ?? "assets/exercise/squat.mp4",
                  });
                  document.body.scrollTop = 0;
                  document.documentElement.scrollTop = 0;
                }}
                sx={{ marginRight: 1, padding: 0 }}
              >
                <PlayCircleIcon
                  fontSize={"large"}
                  sx={{
                    color: palette.green,
                  }}
                  className="playbutton"
                />
              </Button>
            </Box>
          )}
          <CompleteWorkoutDialog item={workout} updateProfile={updateProfile} />
          {state?.user?.profile?.workoutResults && (
            <Typography variant="h5" mt={1}>
              Comments
            </Typography>
          )}
          {(state?.user?.profile?.workoutResults || []).map(
            (results, index) => {
              if (results?.workoutId === workout?.id)
                return (
                  <Box key={index}>
                    <Typography variant="caption" sx={{ color: "green" }}>
                      {formatDate(results?.date)}: {results?.notes}
                    </Typography>
                  </Box>
                );
            },
          )}
        </CardContent>
      </Card>
    </Section>
  );
};

export default function MyPlan() {
  const { state, dispatch } = useContext(Context);
  const [programs, setPrograms] = useState();
  const [viewPlan, setViewPlan] = useState();
  const [viewWorkout, setViewWorkout] = useState();
  const [day, setDay] = useState(1);
  const router = useRouter();

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

  useEffect(() => {
    if (state?.user?.profile) getProgramList();
  }, [state?.user?.profile?.onboarding]);

  async function updateProfile(data) {
    const profileId = state?.user?.profile?.id;
    let newDate = new Date(data?.date ?? "");
    var dd = String(newDate.getDate()).padStart(2, "0");
    var mm = String(newDate.getMonth() + 1).padStart(2, "0");
    var yyyy = newDate.getFullYear();
    //awsDateformat string in the format YYYY-MM-DD
    data.date = `${yyyy}-${mm}-${dd}`;
    let variables = { id: profileId };
    //const exerciseId = (data?.name).replace(" ", "-").toLowerCase();

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

  async function getProgramList() {
    let {
      goal = "",
      experience = "",
      gender = "",
      age = "",
    } = state?.user?.profile?.onboarding ?? {};
    const variables = { limit: 300 };
    let filter = {};
    if (goal) filter.goal = { contains: goal };
    if (experience) filter.level = { contains: experience };
    if (age) filter.age = { contains: age };
    if (gender) filter.gender = { contains: gender };
    variables.filter = filter;
    const matchingprograms = getTrainingPlans({
      goal,
      experience,
      gender,
      age,
    });
    if (!matchingprograms?.error) setPrograms(matchingprograms);
  }

  const profile = state?.user?.profile ?? null;

  if (viewPlan && !viewWorkout)
    return <ProgramDetail program={viewPlan} day={day} setDay={setDay} />;
  else if (viewWorkout)
    return (
      <WorkoutDetail workout={viewWorkout} updateProfile={updateProfile} />
    );
  else return <ViewPrograms profile={profile} programs={programs} />;
}
