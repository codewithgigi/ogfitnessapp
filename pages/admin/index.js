import React, { useEffect } from "react";
import styles from "../../styles/Home.module.css";
import { Box, Button } from "@mui/material";
import Section from "../../components/Section";
import Context from "../../src/context";
import { useRouter } from "next/router";

export default function Admin() {
  const { state } = React.useContext(Context);
  const router = useRouter();

  useEffect(() => {
    //if user is not admin redirect to home page
    // router.push("/");
    console.log("user", state?.user);
  }, [state?.user]);

  return (
    <Section>
      <Box sx={{ maxWidth: 325, margin: "auto" }}>
        <h1 className={styles.title}>Admin page</h1>
        <Button
          type="submit"
          variant="contained"
          size="large"
          style={{ marginTop: 10 }}
          fullWidth
          onClick={() => router.push("/admin/addworkouts")}
        >
          Add workouts
        </Button>
      </Box>
    </Section>
  );
}
