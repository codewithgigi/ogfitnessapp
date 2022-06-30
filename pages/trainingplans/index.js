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
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useRouter } from "next/router";

import Section from "../../components/Section";
import Context from "../../src/context";
import { ExerciseList } from "../../components/admin/exercises";

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

const WorkoutAccordion = ({ workout, day, setViewWorkout }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeExpanded = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setViewWorkout(workout);
  };

  return (
    <Accordion expanded={expanded === day} onChange={handleChangeExpanded(day)}>
      {workout ? (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${day}-content`}
          id={`${day}-header`}
        >
          {workout ? (
            <Typography
              variant="h3"
              sx={{
                width: "80%",
                flexShrink: 0,
                textTransform: "capitalize",
              }}
            >
              {workout?.name ?? "Rest Day"}
            </Typography>
          ) : (
            <Typography
              variant="h4"
              sx={{
                width: "80%",
                flexShrink: 0,
                textTransform: "capitalize",
              }}
            >
              Rest Day
            </Typography>
          )}
        </AccordionSummary>
      ) : (
        <AccordionSummary>Rest Day</AccordionSummary>
      )}

      {workout && (
        <AccordionDetails>
          <Typography sx={{ color: "text.secondary" }}>
            {workout?.instructions ?? "Rest Day"}
          </Typography>
          {workout?.exercises && workout?.exercises.length > 0 && (
            <ExerciseList list={workout?.exercises} />
          )}
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default function MyPlan() {
  const { state } = useContext(Context);
  const [programs, setPrograms] = useState();
  const [viewPlan, setViewPlan] = useState();
  const [viewWorkout, setViewWorkout] = useState();
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
      setPrograms(items);
    } catch (error) {
      console.log("Error with api listWorkouts", error);
    }
  }

  const card = (x, index) => (
    <Card>
      <CardMedia
        component="img"
        height="290"
        image={`/assets/fat-loss-female-${index + 1}.png`}
        alt="female fat loss oksana"
      />
      <CardContent>
        <Typography variant="h2">{x?.name}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {x?.description}
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
        <>
          {weeks.length > 1 && (
            <Typography variant="h2">Week {week}</Typography>
          )}
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
              console.log("dDAYYYYYY", day);
              return (
                <WorkoutAccordion
                  workout={workout?.workout}
                  setViewWorkout={setViewWorkout}
                  day={day}
                />
              );
            })}
          </Box>
        </>,
      );
    }
    return <div>{weeks}</div>;
  };
  // if (viewWorkout) {
  //   return <Workout workout={viewWorkout} planId={viewPlan?.id} />;
  // } else
  if (viewPlan)
    return (
      <Section>
        <Button onClick={() => router.push("/trainingplans")}>All Plans</Button>
        <Typography variant="h2">{viewPlan?.name}</Typography>
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
        <Typography variant="h1">Training Plans</Typography>

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
