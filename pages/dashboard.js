import React, { useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import Context from "../src/context";
import Section from "../components/Section";
import SignIn from "./auth/signin";

export default function Dashboard() {
  const { state } = useContext(Context);
  let router = useRouter();

  useEffect(() => {
    if (!state?.user) router.push(`/auth/signin?r=dashboard`);
  });

  return (
    <Section>
      <div>
        <Typography>Dashboard</Typography>
        <Typography>
          Signed in as {state?.user?.attributes?.preferred_username}
        </Typography>
      </div>
    </Section>
  );
}
