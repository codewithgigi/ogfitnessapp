import React, { useContext } from "react";
import {
  Container,
  Button,
  Box,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { palette } from "../src/theme";
import theme from "../src/theme";

import Context from "../src/context";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AssessmentIcon from "@mui/icons-material/Assessment";

const Navigation = () => {
  const router = useRouter();
  const { state } = useContext(Context);

  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        borderBottom: "1px solid lightgrey",
        backgroundColor: "white",
        paddingRight: 1,
        paddingLeft: 2,
        paddingTop: 0.3,
      }}
    >
      <Grid container justifyContent={"space-between"} alignItems="center">
        <Grid item>
          <img
            alt="og fitness"
            onClick={() => router.push("/")}
            src="/assets/oglogoblack.png"
            width={40}
          />
        </Grid>
        {!state?.user ? (
          <Grid item>
            <Button onClick={() => router.push("/auth/signin")}>SIGN IN</Button>
          </Grid>
        ) : !isMdDown ? (
          <Grid item>
            <Button
              sx={{
                borderRadius: 0,
                color: router?.pathname.includes("training")
                  ? palette.blue
                  : palette.navdark,
                fontSize: isMdDown ? ".7rem" : "1rem",
              }}
              onClick={() => router.push("/training")}
              variant="text"
            >
              Workouts
            </Button>
            <Button
              sx={{
                borderRadius: 0,
                fontSize: isMdDown ? ".7rem" : "1rem",
                color: router?.pathname.includes("dashboard")
                  ? palette.blue
                  : palette.navdark,
              }}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
            <IconButton onClick={() => router.push("/profile")}>
              <Avatar
                sx={{
                  bgcolor: palette.contrastBlue,
                }}
              >
                {state?.user?.attributes?.preferred_username
                  .split("")[0]
                  .toUpperCase()}
              </Avatar>
            </IconButton>
          </Grid>
        ) : (
          <Grid item>
            <IconButton size="small" onClick={() => router.push("/profile")}>
              <Avatar
                sx={{
                  bgcolor: palette.contrastBlue,
                  width: 28,
                  height: 28,
                }}
              >
                <span style={{ fontSize: ".9rem" }}>
                  {state?.user?.attributes?.preferred_username
                    .split("")[0]
                    .toUpperCase()}
                </span>
              </Avatar>
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default Navigation;
