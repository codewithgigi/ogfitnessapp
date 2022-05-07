import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

// image: "",
// video: "",
// name: "",
// muscles: "", //Abs - Lower
// bodypart: "", // Core, Lower, upper
// level: "",
// push: false, //if false its a pull
// joint: "", //SM, M
// modality: "",
// description: "",
// instructions: "",
// image: "",
// video: "",
// vimeoId: "",
export default function ExerciseDetail({ exercise, imageUpload }) {
  const instructions = exercise?.instructions ?? "";
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={8} md={6}>
        {imageUpload ? (
          <img
            src={imageUpload}
            style={{ height: 325, width: "100%", objectFit: "cover" }}
          />
        ) : (
          exercise?.image && (
            <img
              src={exercise?.image}
              style={{ height: 325, width: "100%", objectFit: "cover" }}
            />
          )
        )}
      </Grid>
      <Grid item xs={8}>
        {exercise?.name && (
          <Typography
            variant="h1"
            sx={{ fontSize: "1.4rem", fontWeight: "700" }}
          >
            {exercise?.name}
          </Typography>
        )}
        <Grid container direction="row" spacing={2}>
          {exercise?.description && (
            <Grid item>
              <Typography variant="body1">{exercise?.description}</Typography>
            </Grid>
          )}
          {exercise?.muscles && (
            <Grid item>
              <Typography variant="body1">{exercise?.muscles}</Typography>
            </Grid>
          )}
        </Grid>
        {exercise?.instructions && (
          <>
            <Typography
              variant="h2"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "700",
              }}
            >
              Instructions
            </Typography>
            <Typography>{exercise?.instructions}</Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
}
