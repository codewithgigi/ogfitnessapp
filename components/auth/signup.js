import React, { useContext, useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import {
  validatePassword,
  validateEmail,
  validateUsername,
} from "../../lib/validation";
import Context from "../../src/context";
import useForm from "../../src/hooks/useForm";

const initialValues = {
  username: "",
  email: "",
  password: "",
  code: null,
};

export default function SignUp({ setForm }) {
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
      setForm("confirm");
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
      <Grid container justifyContent={"center"}>
        <Grid item md={12} sm={12}>
          <Typography variant="h6" align="center">
            Signup
          </Typography>
        </Grid>
        <Grid item>
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
            placeholder="Enter username"
            value={values.username}
          />
          {errors?.username && (
            <p style={{ color: "red" }}>{errors?.username}</p>
          )}
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
          {errors?.email && <p style={{ color: "red" }}>{errors?.email}</p>}
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
          {errors?.password && (
            <p style={{ color: "red" }}>{errors?.password}</p>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={onSubmit}
          >
            Signup
          </Button>
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item>
              <Button onClick={() => setForm("signin")}>
                Already have an account? Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => setForm("confirm")}>
                Click here to Cofirm Signup
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}
