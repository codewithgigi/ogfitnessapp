import styles from "../styles/Home.module.css";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import Section from "../components/Section";
export default function Home() {
  const router = useRouter();
  return (
    <Section>
      <h1 className={styles.title}>Welcome to OGFitness</h1>

      <p className={styles.description}>
        Get started in your fitness journey with Oksana Grishina, 5x Ms Olympia.
      </p>
      <Box>
        <iframe
          width="100%"
          src={`https://www.youtube.com/embed/iu9zLwO905o`}
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
    </Section>
  );
}
