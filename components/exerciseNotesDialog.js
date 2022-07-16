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
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { palette } from "../src/theme";
import { formatDate } from "../lib/formatDate";

export default function ExerciseNotesDialog({ item, updateProfile, profile }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const itemId = item?.name.toLowerCase().replaceAll(" ", "-");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateProfile({ notes, date, exerciseId: itemId });
    setOpen(false);
  };
  const handleChange = (e) => {
    setNotes(e?.target?.value);
  };

  const previousResults = (profile?.exerciseResults || []).filter(
    (x) => x.exerciseId === itemId,
  );

  return (
    <React.Fragment>
      <TextSnippetIcon
        sx={{ fontSize: 20, color: palette.blue }}
        onClick={handleClickOpen}
      />
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3">{item?.name}</Typography>
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            Track weights, reps or anything you like. (optional)
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box mt={1}>
            <DatePicker date={date} setDate={setDate} />
            <TextField
              sx={{ marginTop: 2 }}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              name="name"
              label="Notes"
              onChange={handleChange}
              placeholder="Notes (anything you want to track)"
              value={notes}
              inputProps={{ maxLength: 50 }}
            />
          </Box>
          {previousResults.length > 0 && (
            <Typography variant="h3" mt={2}>
              Previous Notes{" "}
            </Typography>
          )}
          {(previousResults || []).map((x, index) => (
            <Box key={index}>
              <Typography sx={{ color: "green" }}>
                {formatDate(x?.date)}:{x?.notes}{" "}
              </Typography>
            </Box>
          ))}
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
