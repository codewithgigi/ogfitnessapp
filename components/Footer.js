import React, { useContext } from "react";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Context from "../src/context";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ©  "}
      <Link color="inherit" href="/">
        <a>ogfit.training</a>
      </Link>
      {"  "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  const { state } = useContext(Context);
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <footer sx={{ padding: 10 }} id="footer">
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          OGFit.training
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Fitness training by 4x Ms Olympia Oksana Grishina
        </Typography>
        <Copyright />
        <Grid container direction="row" justifyContent="center">
          <Link href="/privacy">
            <a>Privacy</a>
          </Link>
          <div style={{ marginLeft: 10, marginRight: 10 }}>|</div>
          <Link href="/privacy">
            <a sx={{ padding: 9 }}>Terms of Use</a>
          </Link>
        </Grid>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
