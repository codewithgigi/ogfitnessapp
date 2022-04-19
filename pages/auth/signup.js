import React, { useContext, useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { palette } from "../../src/theme";
import {
  validatePassword,
  validateEmail,
  validateUsername,
} from "../../lib/validation";
import Context from "../../src/context";
import Link from "next/link";
import Section from "../../components/Section";
import useForm from "../../src/hooks/useForm";

const initialValues = {
  username: "",
  email: "",
  password: "",
  code: null,
};

export default function SignUp() {
  const [error, setError] = useState();
  let router = useRouter();
  const { state } = useContext(Context);
  const { values, onSubmit, onChange, errors } = useForm(
    onSubmitSignUp,
    initialValues,
    validateSignUp,
  );

  async function onSubmitSignUp() {
    const { username, email, password } = values;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          preferred_username: username,
        },
      });
      router.push({ pathname: "/auth/confirm", query: { email } });
    } catch (error) {
      console.log("error", error);

      setError(error.message);
    }
  }

  function validateSignUp() {
    const errors = {};
    errors.email = validateEmail(values.email);
    errors.password = validatePassword(values.password);
    errors.username = validateUsername(values.username);
    return errors;
  }

  if (state?.user?.username)
    return (
      <main className="main">
        <div>Signed in</div>
      </main>
    );
  else
    return (
      <Section>
        <Grid
          container
          flexDirection={"column"}
          justifyContent="center"
          alignItems={"center"}
        >
          <Grid item>
            <Typography component="h1" variant="h5">
              Signup
            </Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChange}
              value={values.email}
              type="email"
              placeholder="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
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
              style={{ marginBottom: 10 }}
              onClick={onSubmit}
            >
              SignIn
            </Button>
          </Grid>
          <Grid item>
            <Link href="/auth/signin">
              <a>
                Already have an account?{" "}
                <span
                  style={{ color: palette.contrastBlue, fontWeight: "bold" }}
                >
                  Sign In
                </span>
              </a>
            </Link>
          </Grid>
          <Grid item>
            <div>
              <Link href="/auth/confirm">
                <a style={{ color: palette.contrastBlue, fontWeight: "700" }}>
                  Cofirm Sign up
                </a>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Section>
    );
}
