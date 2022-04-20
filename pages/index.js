import React from "react";
import styles from "../styles/Home.module.css";
import { Box, Button, Chip, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Section from "../components/Section";
import Context from "../src/context";
export default function Home() {
  const { state } = React.useContext(Context);
  const [goal, setGoal] = React.useState();
  const [gender, setGender] = React.useState();
  const router = useRouter();
  console.log("seting onboardin", goal);

  if (!state?.user)
    return (
      <Section>
        <h1 className={styles.title}>Welcome to OGFitness</h1>
        <p className={styles.description}>
          Get started in your fitness journey with Oksana Grishina, 5x Ms
          Olympia.
        </p>
        <Box>
          <iframe
            width="100%"
            src={`https://www.youtube.com/embed/iu9zLwO905o`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="OGFit.app welcome screen"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{ marginTop: 10 }}
          fullWidth
          onClick={() => router.push("/auth/signup")}
        >
          Let's start
        </Button>
      </Section>
    );
  else
    return (
      <Section>
        <h1>Onboarding</h1>
        <h3>What is your training goal?</h3>
        <Grid container spacing={1}>
          {[
            "Lose Fat / Get Lean",
            "Gain Weight/Muscle",
            "Get Lean and Gain Muscle",
            "Compete",
          ].map((g) => (
            <Grid item>
              <Chip
                color="primary"
                variant={goal === g ? "contained" : "outlined"}
                label={g}
                className={styles.chip}
                onClick={() => {
                  setGoal(g);
                }}
              />
            </Grid>
          ))}
          {goal === "Compete" && (
            <Box>
              <h3>Gender?</h3>
              <Grid container spacing={1}>
                {["Female", "Male"].map((g) => (
                  <Grid item>
                    <Chip
                      color="primary"
                      variant={gender === g ? "contained" : "outlined"}
                      label={g}
                      className={styles.chip}
                      onClick={() => {
                        setGender(g);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Grid>
      </Section>
    );
}
