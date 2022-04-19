import React from "react";
import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import SignIn from "./signin";
import SignUp from "./signup";
import ForgotPasword from "./forgot";
import Confirm from "./confirm";
import ResendConfirm from "./resend-confirmation";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function AuthDialog({ action, price }) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setForm("signin");
    setOpen(false);
  };

  return (
    <div>
      {action === "purchase" ? (
        <Button
          color="primary"
          onClick={handleClickOpen}
          variant="contained"
          fullWidth
        >
          Purchase For {price}
        </Button>
      ) : (
        <Button color="secondary" size="large" onClick={handleClickOpen}>
          Sign In
        </Button>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {action === "purchase" && form === "signin" ? (
            <Typography variant="body1" align="center">
              Signin to access your purchases
            </Typography>
          ) : (
            action === "purchase" && (
              <Typography variant="body1" align="center">
                Create an account to access your purchases
              </Typography>
            )
          )}
          {form === "forgot" ? (
            <ForgotPasword setForm={setForm} />
          ) : form === "signup" ? (
            <SignUp setForm={setForm} />
          ) : form === "signin" ? (
            <SignIn setForm={setForm} handleClose={handleClose} />
          ) : form === "confirm" ? (
            <Confirm setForm={setForm} />
          ) : form === "resend" ? (
            <ResendConfirm setForm={setForm} />
          ) : (
            <SignIn setForm={setForm} handleClose={handleClose} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
