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
    <Box display="flex" direction="row" justifyContent={"center"}>
      {goBack && (
        <ArrowBackIosIcon
          color="primary"
          size="small"
          onClick={() => router.back()}
        />
      )}
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        {title}
        {subtitle && (
          <>
            <br />
            <span style={{ color: "grey", fontSize: "1rem" }}>{subtitle}</span>
          </>
        )}
      </Typography>
    </Box>
  );
  return (
    <div style={{ marginTop: 60 }}>
      {/* {isMdDown && title && pageHeader} */}
      <section
        style={{
          minHeight: "95vh",
          padding: 10,
          maxWidth: theme.layout.contentWidth,
          margin: "0 auto",
        }}
        {...rest}
      >
        {pageHeader}
        {children}
      </section>
    </div>
  );
};

export default Section;
