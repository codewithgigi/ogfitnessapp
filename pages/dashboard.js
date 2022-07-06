import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Box,
  ButtonGroup,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import Context from "../src/context";
import Section from "../components/Section";
import theme from "../src/theme";
import { CustomDay } from "../components/dashboardCalendar";

export default function Dashboard() {
  const { state } = useContext(Context);
  let router = useRouter();

  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (!state?.user) router.push(`/auth/signin?r=dashboard`);
  });
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Section>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Tracking
      </Typography>
      <Box display="flex" justifyContent={"center"} mb={2}>
        <ButtonGroup
          size="small"
          variant="text"
          aria-label="text button group"
          mb={2}
        >
          {["workouts", "MyPhotos", "Weight", "Measurements"].map(
            (label, index) => (
              <Button
                sx={{
                  fontSize: isMdDown ? 12 : 16,
                  textTransform: "capitalize",
                }}
                variant={tab === index + 1 ? "contained" : "outlined"}
                onClick={() => setTab(index + 1)}
              >
                {label}
              </Button>
            ),
          )}
        </ButtonGroup>
      </Box>
      <Typography variant="body1">
        In this section you'll be able to {tab === 1 && "track your workouts"}
        {tab === 2 && "upload and track progress photos"}
        {tab === 3 && "track your weight"}
        {tab === 4 && "track your measurements"}
      </Typography>
      {/* {tab === 1 && <CustomDay />} */}
    </Section>
  );
}
