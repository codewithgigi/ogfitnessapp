import React from "react";
import Context from "../src/context";
import Onboarding from "./onboarding";
import Welcome from "./welcome";
import { useRouter } from "next/router";

export default function Home() {
  const { state } = React.useContext(Context);
  const router = useRouter();

  if (state?.user?.profile?.onboarding) router.push("/trainingplans");
  else if (state?.user && !state?.user?.profile?.onboarding)
    return <Onboarding />;
  else return <Welcome />;
}
