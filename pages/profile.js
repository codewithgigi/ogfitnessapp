import React, { useContext, useEffect } from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import Context from "../src/context";
import Section from "../components/Section";

export default function Profile() {
  const { state } = useContext(Context);
  let router = useRouter();

  useEffect(() => {
    if (!state?.user) router.push(`/auth/signin?r=profile`);
  });

  return (
    <Section>
      <div>
        <Typography>Profile</Typography>
        <Typography>
          Signed in as {state?.user?.attributes?.preferred_username}
        </Typography>
      </div>
    </Section>
  );
}
