import React, { useEffect } from "react";
import styles from "../src/styles/Home.module.css";
import { Box, Button, Typography } from "@mui/material";
import Section from "../components/Section";
import Context from "../src/context";
import { useRouter } from "next/router";

export default function Welcome() {
  const { state } = React.useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (state?.user?.profile?.onboarding) router.push("/trainingplans");
    else if (state?.user && !state?.user?.profile?.onboarding)
      router.push("/onboarding");
  }, [state?.user]);

  return (
    <Section>
      <Box sx={{ maxWidth: 325, margin: "auto", marginTop: 10 }}>
        <Typography variant="h2">Welcome to OGFit.Training</Typography>
        <p className={styles.description}>
          Get started in your fitness journey with Oksana Grishina, 4x Ms
          Fitness Olympia.
        </p>
        <Box>
          <iframe
            width="100%"
            src={`https://vimeo.com/347318822`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="OGFit.app welcome screen"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{ marginTop: 10 }}
          fullWidth
          onClick={() => router.push("/auth/signup")}
        >
          Let's start
        </Button>
      </Box>
    </Section>
  );
}
