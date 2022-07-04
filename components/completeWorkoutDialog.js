import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import DatePicker from "./datePicker";

export default function CompleteWorkoutDialog({ item, updateProfile }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateProfile({ notes, date, workoutId: item?.workout?.id });
    setOpen(false);
  };
  const handleChange = (e) => {
    setNotes(e?.target?.value);
  };

  return (
    <React.Fragment>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleClickOpen}
      >
        Done
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3">Workout Notes</Typography>
        </DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <DatePicker date={date} setDate={setDate} />
            <TextField
              sx={{ marginTop: 2 }}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              name="name"
              label="Workout notes (optional)"
              onChange={handleChange}
              placeholder="Notes"
              value={notes}
              inputProps={{ maxLength: 50 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}