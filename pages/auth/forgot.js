import React from "react";
import { Auth } from "aws-amplify";
import Link from "next/link";
import useForm from "../../src/hooks/useForm";
import { useRouter } from "next/router";
import { Button, TextField, Grid, Typography } from "@mui/material";
import Section from "../../components/Section";
import { palette } from "../../src/theme";

export default function ForgotPasword() {
  const router = useRouter();
  const [message, setMessage] = React.useState();
  const initialValues = { username: "", password: "" };
  const { values, onChange, errors } = useForm(onSubmitForgot, initialValues);

  const [error, setError] = React.useState();

  async function onSubmitForgot() {
    let username = values.username;
    try {
      await Auth.forgotPassword(username);
      setMessage("Check your email for a confirmation code");
    } catch (err) {
      setError("User does not exist");
    }
  }

  async function changePassword() {
    let username = values.username;
    let confirmationCode = values.code;
    let newPassword = values.password;
    try {
      await Auth.forgotPasswordSubmit(username, confirmationCode, newPassword);
      router.push({ pathname: `/auth/signin`, query: { username } });
    } catch (err) {
      if (err.code === "CodeMismatchException") setError(err.message);
      else if (err.code === "LimitExceededException") setError(err.message);
      else setError("Invalid password: enter password greater than 6");
    }
  }

  return (
    <Section>
      <Grid
        container
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        mt={15}
      >
        <Grid item>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
        </Grid>
        <div>{message}</div>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={onChange}
            value={values.username}
            type="email"
            placeholder="Email"
          />
          {errors?.username && (
            <p style={{ color: "red" }}>{errors.username}</p>
          )}
          {message && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="number"
              label="confirmation code"
              name="code"
              autoComplete="code"
              autoFocus
              onChange={onChange}
              value={values.code}
              type="number"
              placeholder="code"
            />
          )}
          {message && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
              placeholder="Enter password"
              value={values.password}
            />
          )}

          {!message ? (
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={onSubmitForgot}
            >
              Submit
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={changePassword}
              style={{ marginBottom: 10 }}
            >
              Change Password
            </Button>
          )}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </Grid>
        <Grid item>
          <Link href="/auth/signin">
            <a
              style={{
                color: palette.contrastBlue,
                fontWeight: "700",
              }}
            >
              Sign In
            </a>
          </Link>
        </Grid>
      </Grid>
    </Section>
  );
}
