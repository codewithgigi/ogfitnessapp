import styles from "../styles/Home.module.css";
import { Box, Button, TextField, Grid, Typography, Link } from "@mui/material";
import { useRouter } from "next/router";
import Section from "../components/Section";
import { palette } from "../src/theme";
export default function Home() {
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: palette.purple,
        padding: 2,
        minHeight: "98vh",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 className={styles.title}>Welcome to OGFitness</h1>

      <p className={styles.description}>
        Get started in your fitness journey with Oksana Grishina, 5x Ms Olympia.
      </p>

      <iframe
        src={`https://www.youtube.com/embed/iu9zLwO905o`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        color="default"
        sx={{
          fontWeight: "bold",
          borderRadius: 50,
          width: 240,
          marginTop: 2,
        }}
        //className={classes.submit}
        onClick={() => router.push("/auth/signup")}
      >
        Let's start
      </Button>
    </Box>
  );
}
