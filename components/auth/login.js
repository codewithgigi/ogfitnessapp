import React, { useContext, useEffect } from "react";
import { Avatar, Button, TextField, Grid, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import Context from "../src/context";
import Section from "./Section";
import useForm from "../src/hooks/useForm";

export default function SignIn({ setForm }) {
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
      //clear local state
      dispatch({ type: "addFavorites", payload: [] });
      dispatch({ type: "addGroceries", payload: [] });
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    if (state?.user?.username) router.push("/");
  });

  return (
    <Grid container justifyContent="center">
      <Grid item md={12} sm={12}>
        <Typography align="center" variant="h6">
          Sign in
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="username"
          name="username"
          autoComplete="username"
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
          //className={classes.submit}
          onClick={onSubmit}
        >
          SignIn
        </Button>
        <Grid container>
          <Grid item xs>
            <Button onClick={() => setForm("forgot")}>Forgot Password</Button>
          </Grid>
          <Grid item>
            <Button onClick={() => setForm("signup")}>Sign up for free</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
