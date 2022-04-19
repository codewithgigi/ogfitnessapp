import styles from "../styles/Home.module.css";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import Section from "../components/Section";
export default function Workouts() {
  const router = useRouter();
  return (
    <Section>
      <h1 className={styles.title}>Workouts</h1>

      <p className={styles.description}>List of workouts</p>
    </Section>
  );
}
