import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import RunCircleIcon from "@mui/icons-material/RunCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MonitorWeightIcon from "@mui/icons-material/MonitorWeight";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={handleChange}
        backgroundColor
      >
        <BottomNavigationAction
          label="Training"
          icon={<FitnessCenterIcon />}
          onClick={() => {
            router.push("/trainingplans");
          }}
        />
        <BottomNavigationAction
          label="Track"
          icon={<MonitorWeightIcon />}
          onClick={() => {
            router.push("/dashboard");
          }}
        />
        <BottomNavigationAction
          label="Profile"
          onClick={() => {
            router.push("/profile");
          }}
          icon={<AccountCircleIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
