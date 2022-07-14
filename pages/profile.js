import React, { useContext, useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/router";
import Context from "../src/context";
import Section from "../components/Section";
import { Auth } from "aws-amplify";

import { beginnermg } from "../lib/female-musclegain-beginner-31-45";
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      user
      email
      onboarding {
        goal
        gender
        age
        experience
        compete
        competeLevel
      }
      weight {
        weight
        date
      }
      progressPhotos {
        frontImage
        sideImage
        backImage
        date
      }
      workoutResults {
        workoutId
        date
        notes
      }
      exerciseResults {
        exerciseId
        date
        notes
      }
      createdAt
      updatedAt
    }
  }
`;

export default function Profile() {
  const { state, dispatch } = useContext(Context);
  const [isAdmin, setIsAdmin] = useState(false);
  let router = useRouter();

  useEffect(() => {
    const groups =
      state?.user?.signInUserSession?.accessToken?.payload["cognito:groups"] ??
      [];
    if ((groups || []).includes("Admin")) setIsAdmin(true);
    if (!state?.user) router.push(`/auth/signin?r=profile`);
  });

  const signOut = async () => {
    try {
      await Auth.signOut();
      dispatch({ type: "removeUser", payload: null });
      router.push("/auth/signin");
    } catch (error) {
      console.log("error signing out", error);
    }
  };

  console.log("beginner p", beginnermg?.workoutList[1]?.exercises);

  return (
    <Section>
      <Typography variant="h3">Profile</Typography>
      <Typography>
        Signed in as {state?.user?.attributes?.preferred_username}
      </Typography>
      <Box border={0.5} borderColor="lightgrey" p={1} borderRadius={2} mt={4}>
        <Typography variant="h2" mt={1}>
          Goals
          <Button
            onClick={() =>
              router.push({ pathname: "/onboarding", query: { update: true } })
            }
          >
            Change Goals
          </Button>
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
      <Button onClick={() => signOut()}>Logout</Button>
      {isAdmin && (
        <Box mt={3}>
          <div>Programs</div>
          <Button onClick={() => router.push("/admin-page")}>Admin Page</Button>
        </Box>
      )}
    </Section>
  );
}
