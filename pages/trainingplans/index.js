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
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useRouter } from "next/router";

import Section from "../../components/Section";
import Context from "../../src/context";
import { ExerciseList } from "../../components/admin/exercises";
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
  const { state } = useContext(Context);
  const [programs, setPrograms] = useState();
  const [viewPlan, setViewPlan] = useState();
  const [day, setDay] = useState(1);
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

  async function updateProfile(data) {
    const profileId = state?.user?.profile?.id;
    let newDate = new Date(data?.date ?? "");
    var dd = String(newDate.getDate()).padStart(2, "0");
    var mm = String(newDate.getMonth() + 1).padStart(2, "0");
    var yyyy = newDate.getFullYear();
    //awsDateformat tring in the format YYYY-MM-DD
    data.date = `${yyyy}-${mm}-${dd}`;
    if (profileId)
      try {
        const results = await API.graphql({
          query: updateProfileResults,
          authMode: "AMAZON_COGNITO_USER_POOLS",
          variables: {
            input: {
              id: profileId,
              workoutResults: { ...data },
            },
          },
        });
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
      <Box mb={4}>
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid item xs={1}>
            {day > 1 && (
              <IconButton onClick={() => setDay(day - 1)}>
                <ArrowBackIosIcon sx={{ fontSize: 26 }} color="primary" />
              </IconButton>
            )}
          </Grid>
          <Grid item xs={2}>
            <Typography
              sx={{ fontSize: 20, fontWeight: 600, textAlign: "center" }}
            >
              Day {day}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {day < 7 && (
              <IconButton onClick={() => setDay(day + 1)}>
                <ArrowForwardIosIcon sx={{ fontSize: 26 }} color="primary" />
              </IconButton>
            )}
          </Grid>
        </Grid>
        {workout && (
          <Box>
            <Typography sx={{ color: "text.secondary" }}>
              {workout?.workout?.instructions ?? "Rest Day"}
            </Typography>
            {workout?.workout?.exercises &&
              workout?.workout?.exercises.length > 0 && (
                <ExerciseList list={workout?.workout?.exercises} />
              )}
            <CompleteWorkoutDialog
              item={workout}
              updateProfile={updateProfile}
            />
          </Box>
        )}
      </Box>
    );
  };
  if (viewPlan)
    return (
      <Section>
        <Grid container alignItems="center">
          <Grid item>
            <ArrowBackIosIcon
              fontSize="small"
              onClick={() => router.push("/trainingplans")}
              color="primary"
            />
          </Grid>
          <Grid item xs={9}>
            <Typography
              variant="h2"
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
              }}
            >
              {viewPlan?.name}
            </Typography>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Box>{renderWeeks()}</Box>
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
