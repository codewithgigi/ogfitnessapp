import React, { useEffect, useState, useContext } from "react";
import { API } from "aws-amplify";
import {
  Card,
  Box,
  Grid,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  ButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import theme, { palette } from "../../src/theme";
import { formatDate } from "../../lib/formatDate";

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
  const { state, dispatch } = useContext(Context);
  const [programs, setPrograms] = useState();
  const [viewPlan, setViewPlan] = useState();
  const [day, setDay] = useState(1);
  const router = useRouter();

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (state?.user?.profile) getProgramList();
  }, [state?.user?.profile?.onboarding]);

  useEffect(() => {
    if (router?.query?.planId) {
      const plan = (programs || []).find((x) => x.id === router?.query?.planId);
      setViewPlan(plan);
    } else setViewPlan();
  }, [router?.query?.planId, programs]);

  async function updateProfile(data) {
    const profileId = state?.user?.profile?.id;
    let newDate = new Date(data?.date ?? "");
    var dd = String(newDate.getDate()).padStart(2, "0");
    var mm = String(newDate.getMonth() + 1).padStart(2, "0");
    var yyyy = newDate.getFullYear();
    //awsDateformat tring in the format YYYY-MM-DD
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
      setPrograms(items);
    } catch (error) {
      console.log("Error with api listWorkouts", error);
    }
  }

  const card = (x, index) => (
    <Card>
      <CardMedia
        component="img"
        height="190"
        image={`/assets/fat-loss-female-${index + 1}.png`}
        alt={x?.name}
      />
      <CardContent>
        <Typography variant="h2" sx={{ textTransform: "capitalize" }}>
          {x?.name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {/* {x?.description} */}
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
          Go to Plan
        </Button>
      </CardActions>
    </Card>
  );
  const profile = state?.user?.profile ?? null;

  const renderWeeks = () => {
    const workout = (viewPlan.workoutList || []).find(
      (list) => list?.day === day && list?.week === 1,
    );

    return (
      <Box>
        <Box display="flex" justifyContent={"center"} mb={2}>
          <ButtonGroup
            size="small"
            variant="text"
            aria-label="text button group"
            mb={2}
          >
            {["day1", "day2", "day3", "day4", "day5", "day6", "day7"].map(
              (label, index) => (
                <Button
                  sx={{
                    fontSize: isMdDown ? 12 : 16,
                    textTransform: "capitalize",
                  }}
                  variant={day === index + 1 ? "contained" : "outlined"}
                  onClick={() => setDay(index + 1)}
                >
                  {label}
                </Button>
              ),
            )}
          </ButtonGroup>
        </Box>

        {workout && (
          <Box>
            <Typography sx={{ color: "text.secondary" }}>
              {workout?.workout?.instructions ?? "Rest Day"}
            </Typography>
            {workout?.workout?.exercises &&
              workout?.workout?.exercises.length > 0 && (
                <ExerciseList
                  list={workout?.workout?.exercises}
                  updateProfile={updateProfile}
                  profile={state?.user?.profile}
                />
              )}
            <CompleteWorkoutDialog
              item={workout}
              updateProfile={updateProfile}
            />
            {state?.user?.profile?.workoutResults && (
              <Typography variant="h5" mt={1}>
                My Workout Notes
              </Typography>
            )}
            {(state?.user?.profile?.workoutResults || []).map(
              (results, index) => {
                if (results?.workoutId === workout?.workout?.id)
                  return (
                    <Box>
                      <Typography variant="caption" sx={{ color: "green" }}>
                        {formatDate(results?.date)}: {results?.notes}
                      </Typography>
                    </Box>
                  );
              },
            )}
          </Box>
        )}
      </Box>
    );
  };

  if (viewPlan)
    return (
      <Section>
        <Typography
          variant="h2"
          sx={{
            textTransform: "capitalize",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          {viewPlan?.name}
        </Typography>
        <Box
          justifyContent={"center"}
          display="flex"
          alignItems="center"
          sx={{ color: palette.blue, fontSize: 14 }}
        >
          <Button
            onClick={() => router.push("/trainingplans")}
            size="small"
            sx={{ fontSize: 14, textTransform: "capitalize", fontWeight: 400 }}
            startIcon={<ArrowBackIosIcon />}
          >
            More Plans
          </Button>
        </Box>
        <Box mt={2}>{renderWeeks()}</Box>
      </Section>
    );
  else
    return (
      <Section>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Training Plans
        </Typography>

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
          {(programs || []).map((program, index) => (
            <div key={index}>
              <Box key={index} sx={{ mb: 2, maxWidth: 400 }}>
                {card(program, index)}
              </Box>
              {program.workoutList.type}
            </div>
          ))}
        </Grid>
      </Section>
    );
}
