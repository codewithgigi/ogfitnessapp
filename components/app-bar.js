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
    <Container
      sx={{
        height: 60,
        position: "sticky",
        top: 0,
        borderBottom: "1px solid lightgrey",
        backgroundColor: "white",
      }}
    >
      <Grid container justifyContent={"space-between"} alignItems="center">
        <Grid item>
          <img
            alt="og fitness"
            onClick={() => router.push("/")}
            src="/assets/oglogoblack.png"
            width={70}
          />
        </Grid>
        {!state?.user ? (
          <Grid item>
            <Button onClick={() => router.push("/auth/signin")}>SIGN IN</Button>
          </Grid>
        ) : (
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
              {!isMdDown && "Training"}
              {isMdDown && (
                <FitnessCenterIcon
                  color={
                    router?.pathname.includes("training")
                      ? "primary"
                      : "secondary"
                  }
                  sx={{ fontSize: "1.5rem" }}
                />
              )}
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
              {!isMdDown && "Progress"}
              {isMdDown && (
                <AssessmentIcon
                  color={
                    router?.pathname.includes("dashboard")
                      ? "primary"
                      : "secondary"
                  }
                  sx={{ fontSize: "1.5rem" }}
                />
              )}
            </Button>
            <IconButton onClick={() => router.push("/profile")}>
              <Avatar
                sx={{
                  bgcolor: palette.contrastBlue,
                  paddingTop: 0.4,
                }}
              >
                {state?.user?.attributes?.preferred_username
                  .split("")[0]
                  .toUpperCase()}
              </Avatar>
            </IconButton>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default Navigation;
