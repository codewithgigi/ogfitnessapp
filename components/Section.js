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
        marginTop: 65,
        minHeight: "90vh",
        padding: 16,
      }}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Section;
