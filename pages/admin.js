import React, { useEffect } from "react";
import styles from "../src/styles/Home.module.css";
import { Box, Button } from "@mui/material";
import Section from "../components/Section";
import Context from "../src/context";
import { useRouter } from "next/router";
import Exercises from "../components/admin/exercises";
import Workouts from "../components/admin/workouts";
import Programs from "../components/admin/programs";

function AdminTabs({ view = "" }) {
  const [tab, setTabView] = React.useState(view);
  const router = useRouter();

  useEffect(() => {
    setTabView(view);
  }, [view]);

  return (
    <Box mt={2}>
      <Button
        onClick={() => router.push("/admin?view=exercises")}
        color={tab === "exercises" ? "primary" : "secondary"}
        sx={{ fontWeight: "bold", fontSize: 18 }}
      >
        Exercises
      </Button>
      <Button
        onClick={() => router.push("/admin?view=workouts")}
        color={tab === "workouts" ? "primary" : "secondary"}
        sx={{ fontWeight: "bold", fontSize: 18 }}
      >
        Workouts
      </Button>
      <Button
        onClick={() => router.push("/admin?view=programs")}
        color={tab === "programs" ? "primary" : "secondary"}
        sx={{ fontWeight: "bold", fontSize: 18 }}
      >
        Programs
      </Button>
      {tab === "exercises" ? (
        <Exercises />
      ) : tab === "workouts" ? (
        <Workouts />
      ) : (
        tab === "programs" && <Programs />
      )}
    </Box>
  );
}

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
      <Box sx={{ maxWidth: 825, margin: "auto" }}>
        <h1 className={styles.title}>Admin page</h1>
        <AdminTabs view={router?.query?.view} />
      </Box>
    </Section>
  );
}
