import * as React from "react";
import { Box, Typography } from "@mui/material";
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

console.log("icons", customIcons[0]?.icon);

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value]?.icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function WorkoutRating() {
  return (
    <>
      <StyledRating
        name="highlight-selected-only"
        defaultValue={2}
        IconContainerComponent={IconContainer}
        getLabelText={(value) => customIcons[value]?.label}
        highlightSelectedOnly
      />
      {/* <Box display={"flex"}>
        {customIcons.map((x, i) => {
          return (
            <Box
              display="flex"
              flexDirection={"column"}
              justifyContent="center"
              alginItems="center"
            >
              {x.icon} <Typography align="center">{x.label}</Typography>
            </Box>
          );
        })}
      </Box> */}
    </>
  );
}
