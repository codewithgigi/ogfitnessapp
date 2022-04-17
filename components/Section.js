import React from "react";

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
        backgroundColor: bgColor ? bgColor : "white",
        padding: 20,
      }}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Section;
