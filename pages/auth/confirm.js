import React, { useContext, useEffect } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import useForm from "../../src/hooks/useForm";
import Context from "../../src/context";
import Link from "next/link";
import Section from "../../components/Section";
import { palette } from "../../src/theme";

const initialValues = {
  username: "",
  email: "",
  password: "",
  code: null,
};

export default function Confirm() {
  let router = useRouter();
  const { query } = router;
  const { state } = useContext(Context);
  const { values, setValues, onChange, onSubmit } = useForm(
    onSubmitConfirm,
    initialValues,
    null,
  );

  useEffect(() => {
    if (query?.email) setValues({ ...values, username: query?.email });
  }, [query]);

  const [error, setError] = React.useState();

  async function onSubmitConfirm() {
    const { username, code } = values;
    try {
      await Auth.confirmSignUp(username, code);
      router.push({ pathname: `/auth/signin`, query: { username } });
    } catch (error) {
      setError(error.message);
      console.log("error confirmed", error);
    }
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
              We have sent a code by email. Enter it below to confirm your
              account.
            </Typography>
          </Grid>
          <Grid item md={8}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
              autoComplete="username"
              onChange={onChange}
              placeholder="Enter email"
              value={values.username}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="code"
              label="Cofirmation Code"
              id="code"
              onChange={onChange}
              value={values.code}
              type="number"
              placeholder="Enter verification code"
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={onSubmit}
              style={{ marginBottom: 10 }}
            >
              Confirm
            </Button>
          </Grid>
          <Grid item>
            <Link href="/auth/signin">
              <a>
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
              <Link href="/auth/resend-confirmation">
                <a style={{ color: palette.contrastBlue, fontWeight: "700" }}>
                  Resend Cofirmation
                </a>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Section>
    );
}
