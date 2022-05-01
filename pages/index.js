import React, { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import Section from "../components/Section";
import Context from "../src/context";
import { useRouter } from "next/router";

export default function Home() {
  const { state } = React.useContext(Context);
  const router = useRouter();
  console.log("index");

  useEffect(() => {
    console.log("index", state?.user);
    if (state?.user?.profile?.onboarding) router.push("/workouts");
    else if (state?.user && !state?.user?.profile?.onboarding)
      router.push("/onboarding");
    else router.push("/welcome");
  }, [state?.user]);

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 300,
      }}
    >
      <CircularProgress />
    </Box>
  );
}
