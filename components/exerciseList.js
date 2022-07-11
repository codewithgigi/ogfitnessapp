import * as React from "react";
import {
  Grid,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import VideoDialog from "./videoDialog";
import { formatDate } from "../lib/formatDate";

import ExerciseNotesDialog from "./exerciseNotesDialog";

export const ExerciseList = ({ list, updateProfile, profile }) => {
  console.log("list", list);
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {(list ?? []).map((x, index) => {
        const previousResults = (profile?.exerciseResults || []).filter(
          (p) => p.exerciseId === x?.id,
        );
        let mostRecentNote;
        if (previousResults.length > 0) mostRecentNote = previousResults.at(-1);

        return (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {x?.video && <VideoDialog item={x} />}
              </ListItemAvatar>
              <ListItemText
                sx={{ textTransform: "capitalize" }}
                primary={x?.order ? `${x?.order}.   ${x?.name}` : ` ${x?.name}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.secondary"
                    >
                      {x?.sets} X {x?.reps}
                    </Typography>
                    <ExerciseNotesDialog
                      item={x}
                      updateProfile={updateProfile}
                      profile={profile}
                    />
                    {mostRecentNote && (
                      <Typography sx={{ color: "green" }}>
                        {formatDate(mostRecentNote?.date)}:{" "}
                        {mostRecentNote?.notes}
                      </Typography>
                    )}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};
