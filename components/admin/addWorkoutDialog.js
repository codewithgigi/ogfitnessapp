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
  ToggleButton,
  ToggleButtonGroup,
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

    if (!newday) {
      newday = {};
      newday.day = dayNum;
      newday.week = week;
      newday[name] = value;
      if (workoutName) newday.workoutName = workoutName;
      if (workoutDescription) newday.workoutDescription = workoutDescription;
      setDays([...days, newday]);
    } else {
      newday.day = dayNum;
      newday.week = week;
      newday[name] = value;
      if (workoutName) newday.workoutName = workoutName;
      if (workoutDescription) newday.workoutDescription = workoutDescription;
      if (days.length > 0) {
        let newdays = (days || []).filter((x) => {
          if (x.day === newday.day) return newday;
          else return x;
        });
        setDays(newdays);
      } else {
        setDays([newday]);
      }
    }
  };

  const renderInputByType = (daynum) => {
    let daybynum = days.find((x) => x.day == daynum);
    if (daybynum?.type === "workout") {
      const menus = (workouts || []).map((x) => (
        <MenuItem value={x}>{x?.name}</MenuItem>
      ));
      return (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">
            Select a Workout
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="workout"
            //value={workout?.name}
            label="workout"
            onChange={(event) => handleChange({ event, dayNum: daynum })}
          >
            {menus}
          </Select>
        </FormControl>
      );
    } else if (daybynum?.type === "rest") {
      return <div>Rest Day</div>;
    }
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
            const dayType = days.find((item) => item.day === x)?.type;
            return (
              <Box key={x}>
                <Typography>Day {x}</Typography>
                <ToggleButtonGroup
                  color="primary"
                  value={dayType}
                  exclusive
                  onChange={(event) => handleChange({ event, dayNum: x })}
                  sx={{ mt: 3 }}
                >
                  {["rest", "workout"].map((x) => (
                    <ToggleButton name="type" value={x}>
                      {x}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                {renderInputByType(x)}
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
