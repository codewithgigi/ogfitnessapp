import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { Box, Button, Chip, Grid } from "@mui/material";
import Section from "../components/Section";
import Context from "../src/context";
import { useRouter } from "next/router";

const menCompete = ["Bodybuilding", "Classic Physique", "Men’s Physique"];
const womenCompete = [
  "Bikini",
  "Fitness",
  "Figure",
  "Wellness",
  "Women's Physique",
];
export default function Onboarding() {
  const { state, dispatch } = React.useContext(Context);
  const router = useRouter();

  const [onboarding, setOnboarding] = React.useState({
    goal: "",
    gender: "",
    age: "",
    experience: "",
    compete: "",
  });
  useEffect(() => {
    if (onboarding)
      setOnboarding({ ...onboarding, ...state?.user?.onboarding });
  }, [state?.user?.onboarding]);

  const onSubmit = () => {
    const newUser = { ...state.user, onboarding };
    dispatch({ type: "addUser", payload: newUser });
    router.push("/workouts");
  };

  return (
    <Section>
      <h1>Select answers below to find your perfect training.</h1>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Gender</h3>
        </Grid>
        {["Female", "Male"].map((g) => (
          <Grid item key={g}>
            <Chip
              color="primary"
              variant={onboarding.gender === g ? "contained" : "outlined"}
              label={g}
              className={styles.chip}
              onClick={() => {
                setOnboarding({
                  ...onboarding,
                  gender: g,
                  goal: "",
                  compete: "",
                });
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Age range</h3>
        </Grid>
        {["18-30", "31-45", "46-65", "65+"].map((a) => (
          <Grid item key={a}>
            <Chip
              color="primary"
              variant={onboarding.age === a ? "contained" : "outlined"}
              label={a}
              className={styles.chip}
              onClick={() => {
                setOnboarding({ ...onboarding, age: a });
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h3>Weight training experience</h3>
        </Grid>
        {["No experience", "Less than 1 year", "1-2 years", "2+ years"].map(
          (e) => (
            <Grid item key={e}>
              <Chip
                color="primary"
                variant={onboarding.experience === e ? "contained" : "outlined"}
                label={e}
                className={styles.chip}
                onClick={() => {
                  setOnboarding({ ...onboarding, experience: e });
                }}
              />
            </Grid>
          ),
        )}
      </Grid>
      <h3>Primary Training goal?</h3>
      <Grid container spacing={1}>
        {["Lose Fat / Get Lean", "Gain Weight/Muscle", "Compete"].map((g) => (
          <Grid item key={g}>
            <Chip
              color="primary"
              variant={onboarding.goal === g ? "contained" : "outlined"}
              label={g}
              className={styles.chip}
              onClick={() => {
                setOnboarding({ ...onboarding, goal: g, compete: "" });
              }}
            />
          </Grid>
        ))}
      </Grid>

      {onboarding.goal === "Compete" && (
        <Box>
          <h3>Compete</h3>
          <Grid container spacing={1}>
            {onboarding.gender === "Male" &&
              menCompete.map((c) => (
                <Grid item key={c}>
                  <Chip
                    color="primary"
                    variant={
                      onboarding.compete === c ? "contained" : "outlined"
                    }
                    label={c}
                    className={styles.chip}
                    onClick={() => {
                      setOnboarding({ ...onboarding, compete: c });
                    }}
                  />
                </Grid>
              ))}
            {onboarding.gender === "Female" &&
              womenCompete.map((c) => (
                <Grid item key={c}>
                  <Chip
                    color="primary"
                    variant={
                      onboarding.compete === c ? "contained" : "outlined"
                    }
                    label={c}
                    className={styles.chip}
                    onClick={() => {
                      setOnboarding({ ...onboarding, compete: c });
                    }}
                  />
                </Grid>
              ))}
          </Grid>
          <h3>Compete Level</h3>
          <Grid container spacing={1}>
            {["Local", "State", "Regional", "National"].map((x) => (
              <Grid item key={x}>
                <Chip
                  color="primary"
                  variant={
                    onboarding.competeLevel === x ? "contained" : "outlined"
                  }
                  label={x}
                  className={styles.chip}
                  onClick={() => {
                    setOnboarding({ ...onboarding, competeLevel: x });
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {onboarding.gender &&
        onboarding.age &&
        onboarding.experience &&
        ((onboarding.goal && onboarding.goal !== "Compete") ||
          (onboarding.goal === "Compete" &&
            onboarding.compete &&
            onboarding.competeLevel)) && (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: 2 }}
            onClick={onSubmit}
          >
            View Training
          </Button>
        )}
    </Section>
  );
}
