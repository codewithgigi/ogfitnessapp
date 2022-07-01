import React from "react";
import { useMediaQuery } from "@mui/material";
import theme from "../src/theme";
/**
 * Component to display the sections
 *
 * @param {Object} props
 */
const Section = ({ bgColor, children, ...rest }) => {
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <section
      style={{
        marginTop: isMdDown ? 5 : 65,
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
