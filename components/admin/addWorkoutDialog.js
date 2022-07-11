import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

export default function AddWorkoutDialog({
  week = 1,
  programname,
  workouts,
  setProgramWorkouts,
}) {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = ({ event, dayNum }) => {
    let newday = days.find((x) => x.day === dayNum && x.week === week);
    let value = event.target.value;
    let name = event.target.name;
    let workoutName;
    let workoutDescription;
    if (name === "type") workoutName = event?.target?.value;
    if (name === "") {
      value = event?.target?.value?.id;
      workoutName = event?.target?.value?.name;
      workoutDescription = event?.target?.value?.instructions;
    }

    newday = {};
    newday.day = dayNum;
    newday.week = week;
    newday[name] = value;
    if (workoutName) newday.workoutName = workoutName;
    if (workoutDescription) newday.workoutDescription = workoutDescription;
    setDays([...days, newday]);
  };

  const renderInput = (dayNum) => {
    const menus = (workouts || []).map((x) => (
      <MenuItem value={x}>{x?.name}</MenuItem>
    ));
    return (
      <>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">
            Select a Workout
          </InputLabel>
          <Select
            name="workout"
            label="workout"
            onChange={(event) => handleChange({ event, dayNum })}
          >
            {menus}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">
            Select a Workout
          </InputLabel>
          <Select
            name="workout"
            label="workout"
            onChange={(event) => handleChange({ event, dayNum })}
          >
            {menus}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">
            Select a Workout
          </InputLabel>
          <Select
            name="workout"
            label="workout"
            onChange={(event) => handleChange({ event, dayNum })}
          >
            {menus}
          </Select>
        </FormControl>
      </>
    );
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} startIcon={<AddIcon />}>
        Add Workouts to Week {week}
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3">{programname}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {[1, 2, 3, 4, 5, 6, 7].map((x) => {
            return (
              <Box key={x}>
                <Typography>Day {x}</Typography>
                {renderInput(x)}
              </Box>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setProgramWorkouts(days);
              setOpen(false);
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
