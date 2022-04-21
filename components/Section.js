import React from "react";
import { palette } from "../src/theme";
import { Box } from "@mui/material";

/**
 * Component to display the sections
 *
 * @param {Object} props
 */
const Section = ({ bgColor, children, ...rest }) => {
  return (
    <section
      style={{
        minHeight: "90vh",
        backgroundColor: palette.lightgrey,
        padding: 5,
      }}
      {...rest}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          padding: 1.5,
          minHeight: "90vh",
        }}
      >
        {children}
      </Box>
    </section>
  );
};

export default Section;
