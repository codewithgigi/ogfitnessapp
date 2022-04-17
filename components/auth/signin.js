import React, { useContext, useEffect } from "react";
import { Box, Button, TextField, Grid, Typography } from "@mui/material";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import Context from "../../src/context";
import useForm from "../../src/hooks/useForm";

export default function SignIn({ setForm, handleClose }) {
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
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item md={12} sm={12}>
        <Typography variant="h6" align="center">
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
          label="Email"
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
