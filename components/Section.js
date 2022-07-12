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
        minHeight: "95vh",
        padding: 16,
        marginTop: isMdDown ? 0 : 60,
        backgroundColor: "whitesmoke",
      }}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Section;
