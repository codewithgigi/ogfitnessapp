import React, { useContext, useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import Context from "../../src/context";

export default function ResendConfirmation({ setForm }) {
  let router = useRouter();
  const { state } = useContext(Context);
  const [username, setUsername] = useState("");

  const [error, setError] = React.useState();

  const resendConfirmationCode = async () => {
    try {
      await Auth.resendSignUp(username);
      setForm("confirm");
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
      <Grid container justifyContent="center">
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="username"
          label="Email"
          id="username"
          autoComplete="email"
          onChange={onChange}
          placeholder="Enter email"
          value={username}
          type="email"
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={() => resendConfirmationCode()}
        >
          Resend Confirmation
        </Button>
        <Grid container justifyContent="space-between">
          <Grid item xs>
            <Button onClick={() => setForm("signin")}>
              Click here to Sign In
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setForm("forgot")}>Forgot password?</Button>
          </Grid>
        </Grid>
      </Grid>
    );
}
