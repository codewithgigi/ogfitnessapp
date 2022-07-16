import * as React from "react";
import {
  Grid,
  Typography,
  List,
  Card,
  CardMedia,
  Box,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import VideoDialog from "./videoDialog";
import ExerciseNotesDialog from "./exerciseNotesDialog";
import { palette } from "../src/theme";

export const ExerciseList = ({ list, updateProfile, profile }) => {
  return (
    <Box sx={{ width: "100%" }}>
      {(list ?? []).map((x, index) => {
        const previousResults = (profile?.exerciseResults || []).filter(
          (p) => p.exerciseId === x?.id,
        );
        let mostRecentNote;
        if (previousResults.length > 0) mostRecentNote = previousResults.at(-1);

        return (
          <Box key={index}>
            <Grid
              container
              alignItems="flex-start"
              sx={{
                paddingBottom: 1,
                paddingTop: 1,
                backgroundColor: palette.lightestgrey,
              }}
            >
              <Grid item xs={2}>
                {/* <div class="container">
                  <img
                    src={x?.image ?? "/assets/exercise/squatimage.png"}
                    style={{
                      height: 60,
                      width: 100,
                      objectFit: "cover",
                    }}
                  />
                  <div className="play-button">
                  </div>
                </div> */}
                <VideoDialog item={x} color={true} />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">
                  {index + 1}. {x?.name}
                </Typography>
                <Typography variant="subtitle" color="text.secondary">
                  {x?.sets} X {x?.reps}{" "}
                  <ExerciseNotesDialog
                    item={x}
                    updateProfile={updateProfile}
                    profile={profile}
                  />
                </Typography>
              </Grid>
            </Grid>
            {index < list.length - 1 && <Divider />}
            {mostRecentNote && (
              <Typography sx={{ color: "green", marginLeft: 2 }}>
                {formatDate(mostRecentNote?.date)}: {mostRecentNote?.notes}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
