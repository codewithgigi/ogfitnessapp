import React, { useEffect, useState, useContext } from "react";
import { API, Storage } from "aws-amplify";
import {
  Card,
  Box,
  Grid,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import styles from "../../src/styles/Home.module.css";
import Section from "../../components/Section";
import Context from "../../src/context";
import { getStorageFiles } from "../../components/admin/exercises";

const getWorkoutById = /* GraphQL */ `
  query getWorkout(
  }
`;

export default function WorkoutDetail() {
  const { state } = useContext(Context);
  const [programs, setPrograms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getWorkout();
  }, [state?.user?.profile?.onboarding]);

  async function getWorkout() {
    console.log("get workout by id");
  }

  return (
    <Section>
      <h1 className={styles.title}>Workout by Id</h1>
    </Section>
  );
}
