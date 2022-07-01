import React from "react";
import Context from "../src/context";
import Onboarding from "./onboarding";
import MyPlan from "./trainingplans";
import Welcome from "./welcome";

export default function Home() {
  const { state } = React.useContext(Context);

  if (state?.user?.profile?.onboarding) return <MyPlan />;
  else if (state?.user && !state?.user?.profile?.onboarding)
    return <Onboarding />;
  else return <Welcome />;
}
