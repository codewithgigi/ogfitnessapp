import React, { useEffect } from "react";
import styles from "../styles/Home.module.css";
import Section from "../components/Section";
import Context from "../src/context";
import { useRouter } from "next/router";

export default function Workouts() {
  const { state } = React.useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (!state?.user?.onboarding) router.push("/");
  }, [state?.user]);
  console.log("workouts", state?.user?.onboarding);

  return (
    <Section>
      <h1 className={styles.title}>Workouts</h1>

      <p className={styles.description}>List of workouts</p>
      <p>{JSON.stringify(state?.user?.onboarding)}</p>
    </Section>
  );
}
