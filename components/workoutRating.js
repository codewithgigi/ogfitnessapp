import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize: 60 }} />,
    label: "Don't Like",
  },
  2: {
    icon: <SentimentSatisfiedIcon color="warning" sx={{ fontSize: 60 }} />,
    label: "Like",
  },
  3: {
    icon: <SentimentVerySatisfiedIcon color="success" sx={{ fontSize: 60 }} />,
    label: "Love",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value]?.icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function WorkoutRating({ setRating }) {
  return (
    <StyledRating
      name="highlight-selected-only"
      defaultValue={2}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value]?.label}
      highlightSelectedOnly
      onChange={(e) => {
        console.log("rating", e?.target?.value);
        if (e?.target?.value === 1) setRating("don't like");
        if (e?.target?.value === 2) setRating("like");
        if (e?.target?.value === 3) setRating("love");
      }}
    />
  );
}
