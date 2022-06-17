import React, { useContext, useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";
import Context from "../src/context";
import Section from "../components/Section";

export default function Profile() {
  const { state } = useContext(Context);
  const [isAdmin, setIsAdmin] = useState(false);
  let router = useRouter();

  useEffect(() => {
    const groups =
      state?.user?.signInUserSession?.accessToken?.payload["cognito:groups"] ??
      [];
    if ((groups || []).includes("Admin")) setIsAdmin(true);
    if (!state?.user) router.push(`/auth/signin?r=profile`);
  });

  return (
    <Section>
      <Typography variant="h3">Profile</Typography>
      <Typography>
        Signed in as {state?.user?.attributes?.preferred_username}
      </Typography>
      <Box border={0.5} borderColor="lightgrey" p={1} borderRadius={2} mt={4}>
        <Typography variant="h2" mt={1}>
          Goals
          {isAdmin && (
            <Button onClick={() => router.push("/onboarding")}>
              Change Goals
            </Button>
          )}
        </Typography>
        <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
          Goal: {state?.user?.profile?.onboarding?.goal}
        </Typography>
        <Typography variant="h5" sx={{ textTransform: "capitalize" }} mt={1}>
          Gender: {state?.user?.profile?.onboarding?.gender}
        </Typography>
        <Typography variant="h5" sx={{ textTransform: "capitalize" }} mt={1}>
          Level: {state?.user?.profile?.onboarding?.experience}
        </Typography>
        <Typography variant="h5" sx={{ textTransform: "capitalize" }} mt={1}>
          Age: {state?.user?.profile?.onboarding?.age}
        </Typography>
      </Box>
      <Box mt={3}>
        {isAdmin && (
          <Button onClick={() => router.push("/admin")}>Admin Page</Button>
        )}
      </Box>
    </Section>
  );
}
