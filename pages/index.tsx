import styles from "../styles/Home.module.css";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";
import Section from "../components/Section";
import { palette } from "../src/theme";
export default function Home() {
  return (
    <Box
      sx={{
        backgroundColor: palette.purple,
        padding: 2,
        minHeight: "90vh",
        color: "white",
      }}
    >
      <h1 className={styles.title}>Welcome to OGFitness</h1>

      <p className={styles.description}>
        Get started in your fitness journey with Oksana Grishina, 5x Ms Olympia.
      </p>

      <div className={styles.grid}>
        <iframe
          width="100%"
          height="100%"
          src="https://player.vimeo.com/video/403530213"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen=""
        ></iframe>
      </div>
      <Button
        type="submit"
        variant="outlined"
        size="large"
        sx={{
          background: "white",
          border: "1px solid black",
          color: "black",
          fontWeight: "bold",
          borderRadius: 50,
          width: "100%",
        }}
        //className={classes.submit}
        //onClick={onSubmit}
      >
        Let's start
      </Button>
    </Box>
  );
}
