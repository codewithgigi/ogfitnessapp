import React, { useEffect } from "react";
import styles from "../src/styles/Home.module.css";
import { Box, Button, Typography } from "@mui/material";
import Section from "../components/Section";
import Context from "../src/context";
import { useRouter } from "next/router";
import Exercises from "../components/admin/exercises";
import AddExercise from "../components/admin/addexercise";
import Workouts from "../components/admin/workouts";
import WorkoutPlans from "../components/admin/workoutplans";
import ReactPlayer from "react-player";

export default function VideoPlayer({ videoid }) {
  useEffect(() => {
    console.log("user", state?.user);
  }, [state?.user]);

  return (
    <>
      {videoid && (
        <>
          <iframe
            class="responsive-iframe"
            src={`https://player.vimeo.com/video/${videoid}`}
            width="640"
            height="360"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </>
      )}
    </>
  );
}
