import React, { useContext, useEffect } from "react";
import { Button, TextField, Grid } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import useForm from "../../src/hooks/useForm";
import Context from "../../src/context";
import Link from "next/link";
import Section from "../../components/Section";

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
        <Grid container item md={4} sm={6} xs={12} justifyContent="center">
          <div>
            <p>
              We have sent a code by email. Enter it below to confirm your
              account.
            </p>
          </div>
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
            <Link href="/auth/signin">
              <a>Click here to Sign In</a>
            </Link>
          </Grid>
          <Grid item xs>
            <Link href="/auth/resend-confirmation">
              <a>Click here to resend confirmation</a>
            </Link>
          </Grid>
        </Grid>
      </Section>
    );
}
