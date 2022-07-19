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
  IconButton,
} from "@mui/material";
import DatePicker from "./datePicker";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CloseIcon from "@mui/icons-material/Close";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVerySatisfiedIcon color="success" sx={{ fontSize: 60 }} />,
    label: "Love",
  },
  2: {
    icon: <SentimentSatisfiedIcon color="warning" sx={{ fontSize: 60 }} />,
    label: "Like",
  },
  3: {
    icon: <SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize: 60 }} />,
    label: "Don't Like",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value]?.icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function CompleteWorkoutDialog({ item, updateProfile }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState("love");
  const [date, setDate] = useState(new Date());

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    updateProfile({ notes, date, workoutId: item?.id, rating });
    setOpen(false);
  };
  const handleChange = (e) => {
    setNotes(e?.target?.value);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleClickOpen}
        fullWidth
      >
        Done
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography variant="h3" sx={{ width: "90%" }}>
            Workout Rating
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              width: "10%",
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
          <Box mt={1} display="flex" alignItems="center" flexDirection="column">
            {rating === "not like" ? "don't like" : rating}
            <StyledRating
              name="highlight-selected-only"
              defaultValue={1}
              IconContainerComponent={IconContainer}
              getLabelText={(value) => customIcons[value]?.label}
              highlightSelectedOnly
              onChange={(e) => {
                const val = Number(e?.target?.value);
                if (val === 1) {
                  setRating("love");
                }
                if (val === 2) setRating("like");
                if (val === 3) setRating("not like");
              }}
            />
          </Box>
          <Box mt={3} />
          <DatePicker date={date} setDate={setDate} />
          <TextField
            sx={{ marginTop: 2 }}
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            name="notes"
            label="Workout feedback (optional)"
            onChange={handleChange}
            placeholder="please share any feedback"
            value={notes}
            inputProps={{ maxLength: 50 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Mark Complete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
