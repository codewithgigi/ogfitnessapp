import React, { useEffect } from "react";
import styles from "../src/styles/Home.module.css";
import { Box, Button, Tabs, Tab, TabPanel } from "@mui/material";
import Section from "../components/Section";
import { useRouter } from "next/router";
import Exercises from "../components/admin/exercises";
import Workouts from "../components/admin/workouts";
import Programs from "../components/admin/programs";
import { withSSRContext } from "aws-amplify";

function AdminTabs({ view = "exercises" }) {
  const [tab, setTab] = React.useState(0);
  const router = useRouter();

  console.log("router query", router?.query);
  useEffect(() => {
    const view = router?.query?.view;
    if (view === "exercises") setTab(0);
    else if (view === "workouts") setTab(1);
    else if (view === "programs") setTab(2);
  }, [router?.query]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    if (newValue === 0) router.push("/admin?view=exercises");
    else if (newValue === 1) router.push("/admin?view=workouts");
    else if (newValue === 2) router.push("/admin?view=programs");
  };

  return (
    <Box mt={3}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} aria-label="admin tabs">
          <Tab label="Exercises" />
          <Tab label="Workouts" />
          <Tab label="Programs" />
        </Tabs>
        {tab === 0 ? (
          <Exercises />
        ) : tab === 1 ? (
          <Workouts />
        ) : (
          tab === 2 && <Programs />
        )}
      </Box>
    </Box>
  );
}

export default function Admin(props) {
  const router = useRouter();
  useEffect(() => {
    if (!props?.user || !(props?.user?.groups || []).includes("Admin"))
      router.push("/");
  }, [props?.user]);

  return (
    <Section>
      <Box sx={{ maxWidth: 825, margin: "auto" }}>
        <h1 className={styles.title}>Admin page</h1>
        <AdminTabs view={router?.query?.view} />
      </Box>
    </Section>
  );
}

export async function getServerSideProps(context) {
  const slug = context?.query?.slug;
  const { Auth } = withSSRContext(context);
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
    const groups =
      user?.signInUserSession?.accessToken?.payload["cognito:groups"] ?? [];
    return {
      props: {
        user: {
          username: user?.username,
          attributes: user?.attributes,
          groups: groups,
        },
        authenticated: true,
      },
    };
  } catch (error) {
    console.log("error", error);
  }
  return { props: { user: null } };
}
