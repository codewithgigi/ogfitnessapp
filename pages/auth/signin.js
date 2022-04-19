import React, { useContext, useEffect } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import Context from "../../src/context";
import Section from "../../components/Section";
import Link from "next/link";
import useForm from "../../src/hooks/useForm";
import { palette } from "../../src/theme";

export default function SignIn() {
  const { state, dispatch } = useContext(Context);
  let router = useRouter();
  const { query } = router;
  const { values, setValues, onChange, onSubmit } = useForm(
    onSubmitSignIn,
    { username: "", password: "" },
    null,
  );

  useEffect(() => {
    if (query?.username) setValues({ ...values, username: query?.username });
  }, [query]);

  const [error, setError] = React.useState();

  async function onSubmitSignIn() {
    const { username, password } = values;
    try {
      const userData = await Auth.signIn({
        username,
        password,
      });
      dispatch({
        type: "addUser",
        payload: userData,
      });
      if (query?.r) router.push(`/${query?.r}`);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    if (state?.user?.username) {
      if (query?.r) router.push(`/${query?.r}`);
      else router.push("/");
    }
  });

  return (
    <Section>
      <Grid
        container
        flexDirection={"column"}
        justifyContent="center"
        alignItems="center"
        spacing="2"
      >
        <Grid item>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Grid>
        <Grid item md={8}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={onChange}
            value={values.username}
            type="email"
            placeholder="Email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            onChange={onChange}
            placeholder="Enter password"
            value={values.password}
            type="password"
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginBottom: 1 }}
            onClick={onSubmit}
          >
            SignIn
          </Button>
        </Grid>
        <Grid item>
          <Link href="/auth/signup">
            <a>
              Don't have an account?{" "}
              <span style={{ color: palette.contrastBlue, fontWeight: "bold" }}>
                Sign up
              </span>
            </a>
          </Link>
        </Grid>
        <Grid item>
          <Link href="/auth/forgot">
            <a style={{ color: palette.contrastBlue, fontWeight: "700" }}>
              Forgot Password
            </a>
          </Link>
        </Grid>
      </Grid>
    </Section>
  );
}
