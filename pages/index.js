import React from "react";
import Context from "../src/context";
import Onboarding from "./onboarding";
import MyPlan from "./myplan";
import Welcome from "./welcome";

export default function Home() {
  const { state } = React.useContext(Context);

  console.log("user ......", state.user);

  if (state?.user?.profile?.onboarding) return <MyPlan />;
  else if (state?.user && !state?.user?.profile?.onboarding)
    return <Onboarding />;
  else return <Welcome />;
}
