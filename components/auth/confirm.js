import React, { useContext, useEffect } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import useForm from "../../src/hooks/useForm";
import Context from "../../src/context";

const initialValues = {
  username: "",
  email: "",
  password: "",
  code: null,
};

export default function Confirm({ setForm }) {
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
      setForm("signin");
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
      <Grid container justifyContent={"center"}>
        <Grid item md={12} sm={12}>
          <Typography variant="body2">
            We have sent a code by email. Enter it below to confirm your
            account.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Email"
            id="username"
            autoComplete="username"
            onChange={onChange}
            placeholder="Enter email"
            value={values.username}
            type="email"
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
          >
            Confirm
          </Button>
          <Grid item xs>
            <Button onClick={() => setForm("signin")} color="secondary">
              Click here to Sign In
            </Button>
          </Grid>
          <Grid item xs>
            <Button onClick={() => setForm("resend")}>
              Click here to resend confirmation
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
}
