import React from "react";
import { useMediaQuery, Box, Button, Typography, Grid } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/router";
import theme from "../src/theme";
/**
 * Component to display the main section and header/title
 *
 * @param {Object} props
 */
const Section = ({ bgColor, children, title, subtitle, goBack, ...rest }) => {
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const pageHeader = (
    <Grid
      container
      display="flex"
      flexDirection={"row"}
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: isMdDown ? "white" : "",
        paddingTop: 2,
        paddingBottom: 2,
      }}
    >
      {goBack && (
        <Grid item xs={2}>
          <Button
            onClick={() => router.back()}
            size="small"
            sx={{ fontSize: 14, textTransform: "capitalize", fontWeight: 400 }}
            startIcon={<ArrowBackIosIcon />}
          ></Button>
        </Grid>
      )}
      <Grid item xs={8}>
        <Typography
          variant="h4"
          sx={{
            textTransform: "capitalize",
            textAlign: "center",
            marginBottom: 0,
          }}
        >
          {title}
          {subtitle && (
            <>
              <br />
              <span style={{ color: "grey", fontSize: "1rem" }}>
                {" "}
                {subtitle}
              </span>
            </>
          )}
        </Typography>
      </Grid>
      {goBack && <Grid item xs={2}></Grid>}
    </Grid>
  );
  return (
    <div style={{ marginTop: !isMdDown ? 100 : 5 }}>
      {isMdDown && title && pageHeader}
      <section
        style={{
          minHeight: "95vh",
          padding: 10,
          maxWidth: theme.layout.contentWidth,
          margin: "0 auto",
        }}
        {...rest}
      >
        {!isMdDown && pageHeader}
        {children}
      </section>
    </div>
  );
};

export default Section;
