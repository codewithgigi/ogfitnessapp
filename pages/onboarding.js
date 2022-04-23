import React, { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { Box, Button, Chip, Typography } from "@mui/material";
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
  const buttonRef = useRef();

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

  const scrollToBottom = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Section>
      <h1>Get your perfect OGfit training</h1>
      <h2>Gender</h2>
      {["Female", "Male"].map((g) => (
        <Chip
          key={g}
          color="primary"
          variant={onboarding.gender === g ? "contained" : "outlined"}
          sx={{ mr: 0.5, fontSize: "1rem" }}
          label={g}
          className={styles.chip}
          onClick={() => {
            setOnboarding({
              ...onboarding,
              gender: g,
              goal: "",
              compete: "",
              competeLevel: "",
            });
          }}
        />
      ))}
      <h2>Age range</h2>
      {["18-30", "31-45", "46-65", "65+"].map((a) => (
        <Chip
          key={a}
          sx={{ mr: 0.5 }}
          color="primary"
          variant={onboarding.age === a ? "contained" : "outlined"}
          label={a}
          className={styles.chip}
          onClick={() => {
            setOnboarding({ ...onboarding, age: a });
          }}
        />
      ))}
      <h2>Weight training experience</h2>
      {[
        "0 - 3 months",
        "3 - 6 months",
        "6 months - 1 year",
        "1 - 2 years",
        "2+ years",
      ].map((e) => (
        <Chip
          key={e}
          sx={{ mr: 0.5, mb: 0.5 }}
          color="primary"
          variant={onboarding.experience === e ? "contained" : "outlined"}
          label={e}
          className={styles.chip}
          onClick={() => {
            setOnboarding({ ...onboarding, experience: e });
          }}
        />
      ))}
      <h2>Primary Training goal?</h2>
      {["Lose Fat / Get Lean", "Gain Weight/Muscle", "Compete"].map((g) => (
        <Chip
          key={g}
          sx={{ mr: 0.5, mb: 0.5 }}
          color="primary"
          variant={onboarding.goal === g ? "contained" : "outlined"}
          label={g}
          className={styles.chip}
          onClick={() => {
            setOnboarding({ ...onboarding, goal: g, compete: "" });
          }}
        />
      ))}

      {onboarding.goal === "Compete" && !onboarding?.gender && (
        <h2>Select a gender above to see compete divisions</h2>
      )}
      {onboarding.goal === "Compete" && onboarding?.gender && (
        <Box>
          <h2>Compete</h2>
          {onboarding.gender === "Male" &&
            menCompete.map((c) => (
              <Chip
                key={c}
                sx={{ mr: 0.5, mb: 0.5 }}
                color="primary"
                variant={onboarding.compete === c ? "contained" : "outlined"}
                label={c}
                className={styles.chip}
                onClick={() => {
                  setOnboarding({ ...onboarding, compete: c });
                }}
              />
            ))}
          {onboarding.gender === "Female" &&
            womenCompete.map((c) => (
              <Chip
                key={c}
                sx={{ mr: 0.5, mb: 0.5 }}
                color="primary"
                variant={onboarding.compete === c ? "contained" : "outlined"}
                label={c}
                className={styles.chip}
                onClick={() => {
                  setOnboarding({ ...onboarding, compete: c });
                }}
              />
            ))}
          <h3>Compete Level</h3>
          {["Local", "State", "Regional", "National"].map((x) => (
            <Chip
              key={x}
              sx={{ mr: 0.5, mb: 0.5 }}
              color="primary"
              variant={onboarding.competeLevel === x ? "contained" : "outlined"}
              label={x}
              className={styles.chip}
              onClick={() => {
                setOnboarding({ ...onboarding, competeLevel: x });
                scrollToBottom();
              }}
            />
          ))}
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
            ref={buttonRef}
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
