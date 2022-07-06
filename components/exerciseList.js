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

import ExerciseNotesDialog from "./exerciseNotesDialog";

export const ExerciseList = ({ list, updateProfile, profile }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {(list ?? []).map((x, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              {x?.video && <VideoDialog item={x} />}
            </ListItemAvatar>
            <ListItemText
              sx={{ textTransform: "capitalize" }}
              primary={`${x?.order}.   ${x?.name}`}
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
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};
