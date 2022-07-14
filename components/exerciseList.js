import * as React from "react";
import { Button, Grid, Typography, List } from "@mui/material";
import VideoDialog from "./videoDialog";
import PlayCircleIcon from "@mui/icons-material/PlayCircleOutlineTwoTone";
import ExerciseNotesDialog from "./exerciseNotesDialog";
import { palette } from "../src/theme";

export const ExerciseList = ({ list, updateProfile, profile, setSelected }) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {(list ?? []).map((x, index) => {
        const previousResults = (profile?.exerciseResults || []).filter(
          (p) => p.exerciseId === x?.id,
        );
        let mostRecentNote;
        if (previousResults.length > 0) mostRecentNote = previousResults.at(-1);

        return (
          <React.Fragment key={index}>
            <Grid
              container
              justifyContent={"flex-start"}
              direction="row"
              wrap="nowrap"
              sx={{ marginBottom: 2 }}
            >
              {x?.image ? (
                <Grid item>
                  <img src={x?.image} height={50} />
                </Grid>
              ) : (
                <Grid item sx={{ marginRight: 1 }}>
                  <img src="/assets/exercise/squatimage.png" height={50} />
                </Grid>
              )}
              <Grid item xs={10}>
                <Typography
                  sx={{
                    display: "inline",
                    textTransform: "capitalize",
                  }}
                >
                  {x?.name}
                </Typography>
                <br />
                <Typography
                  sx={{
                    display: "inline",
                    textTransform: "capitalize",
                    paddingLeft: 1,
                  }}
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {x?.sets} X {x?.reps}
                  <ExerciseNotesDialog
                    item={x}
                    updateProfile={updateProfile}
                    profile={profile}
                  />
                </Typography>
              </Grid>
              {x?.video ? (
                <Grid item>
                  <Button
                    onClick={() => {
                      setSelected(x);
                      document.body.scrollTop = 0;
                      document.documentElement.scrollTop = 0;
                    }}
                    sx={{ marginRight: 1, padding: 0 }}
                  >
                    <PlayCircleIcon
                      fontSize={"large"}
                      sx={{
                        color: palette.green,
                      }}
                      className="playbutton"
                    />
                  </Button>
                </Grid>
              ) : (
                <Grid item>
                  <Button
                    onClick={() => {
                      setSelected(x);
                      document.body.scrollTop = 0;
                      document.documentElement.scrollTop = 0;
                    }}
                    sx={{ marginRight: 1, padding: 0 }}
                  >
                    <PlayCircleIcon
                      fontSize={"large"}
                      sx={{
                        color: palette.green,
                      }}
                      className="playbutton"
                    />
                  </Button>
                </Grid>
              )}
            </Grid>
            {mostRecentNote && (
              <Typography sx={{ color: "green", marginLeft: 2 }}>
                {formatDate(mostRecentNote?.date)}: {mostRecentNote?.notes}
              </Typography>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};
