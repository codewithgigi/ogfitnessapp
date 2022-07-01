import React, { useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import Context from "../src/context";
import Section from "../components/Section";

export default function Dashboard() {
  const { state } = useContext(Context);
  let router = useRouter();

  useEffect(() => {
    if (!state?.user) router.push(`/auth/signin?r=dashboard`);
  });

  return (
    <Section>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Tracking
      </Typography>
      <Typography variant="body1">
        In this section you'll be able to track the days you've worked out.
        Uplaod progress photos and track your weight.
      </Typography>
    </Section>
  );
}
