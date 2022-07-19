import React, { useContext, useEffect, useReducer, useState } from "react";
import { Amplify, Auth, API } from "aws-amplify";

import awsConfig from "../src/aws-exports";
import Footer from "../components/Footer";
import Context from "../src/context";
import reducer from "../src/Reducer";
import { useRouter } from "next/router";

import { useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import maintheme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import theme from "../src/theme";
import "../src/styles/payments.css";
import "../src/styles/global.css";
import Navigation from "../components/app-bar";
import BottomNav from "../components/BottomNav";
import { getProfile } from "./profile";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

Amplify.configure({ ...awsConfig, ssr: true });
function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) {
  const initialState = useContext(Context);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    if (!state?.user) getUser();
    if (state?.user && !state?.user?.profile) myProfile();
  }, [state?.user]);

  async function getUser() {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      dispatch({ type: "addUser", payload: userData });
    } catch (error) {
      dispatch({ type: "removeUser", payload: null });
    }
  }
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  let router = useRouter();
  useEffect(() => {
    if (router?.pathname) {
      let path = router?.pathname.split("/")[1];
      if (path === "myrecipes") path = "";
      if (path === "") path = "Recipes";
      if (path === "blog") path = "Mealplans";
      if (path === "auth") path = router?.pathname.split("/")[2];
      if (path === "addrecipe") path = "Add Recipe";

      setPathname(path);
    }
  }, [router]);

  async function myProfile() {
    if (state?.user?.username)
      try {
        const { data } = await API.graphql({
          query: getProfile,
          variables: { id: state?.user?.username },
          authMode: "AMAZON_COGNITO_USER_POOLS",
        });
        const profile = data?.getProfile;
        if (profile) {
          const userdata = state?.user;
          userdata.profile = profile;
          dispatch({ type: "addUser", payload: userdata });
        }
      } catch (error) {
        console.warn("Error with api getProfile", error);
      }
  }

  return (
    <Context.Provider value={{ state, dispatch }}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div>
            <Navigation />
            <Component {...pageProps} />
          </div>
          {!isMdDown && <Footer />}
        </ThemeProvider>
      </CacheProvider>
    </Context.Provider>
  );
}

export default MyApp;
