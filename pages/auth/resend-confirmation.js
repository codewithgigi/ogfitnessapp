import React, { useContext, useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import Context from "../../src/context";
import Link from "next/link";
import Section from "../../components/Section";
import { palette } from "../../src/theme";

export default function ResendConfirmation() {
  let router = useRouter();
  const { state } = useContext(Context);
  const [username, setUsername] = useState("");

  const [error, setError] = React.useState();

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(username);
      router.push({ pathname: "/auth/confirm", query: { username } });
    } catch (err) {
      setError(err.message);
    }
  };

  const onChange = (event) => {
    let value = event.target.value;
    setUsername(value);
  };

  if (state?.user?.username)
    return (
      <main className="main">
        <div>Signed in</div>
      </main>
    );
  else
    return (
      <Section>
        <Grid container item md={4} sm={6} xs={12} justifyContent="center">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="username"
            id="username"
            autoComplete="email"
            onChange={onChange}
            placeholder="Enter email"
            value={username}
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={() => resendConfirmationCode()}
            style={{ marginBottom: 10 }}
          >
            Resend Confirmation
          </Button>
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
