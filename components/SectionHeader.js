import React from "react";
import { Grid, Typography } from "@mui/material";

/**
 * Component to display the section headers
 *
 * @param {Object} props
 */
const SectionHeader = (props) => {
  const { title, subtitleVariant, subtitle, subtitleColor, align, ctaGroup } =
    props;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography align={align || "left"} color="textPrimary">
          {title}
        </Typography>
      </Grid>
      {subtitle && (
        <Grid item xs={12}>
          <Typography
            variant={subtitleVariant || "h6"}
            align={align || "left"}
            color={subtitleColor || "textSecondary"}
          >
            {subtitle}
          </Typography>
        </Grid>
      )}
      {ctaGroup && ctaGroup.length && (
        <Grid item xs={12}>
          <Grid
            container
            justifyContent={justifyGrid}
            alignItems="center"
            wrap="nowrap"
          >
            {ctaGroup.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default SectionHeader;
