import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Link from "next/link";
import { palette } from "../src/theme";
import Image from "next/image";

import Person from "@mui/icons-material/AccountCircle";
import { Auth } from "aws-amplify";

import Context from "../src/context";

const pages = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Workouts", path: "/workouts" },
  { name: "Profile", path: "/profile" },
  { name: "Settings", path: "/settings" },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const router = useRouter();
  const { state, dispatch } = useContext(Context);

  const signOut = async () => {
    handleClose();
    try {
      await Auth.signOut();
      dispatch({ type: "removeUser", payload: null });
      router.push("/auth/signin");
    } catch (error) {
      console.log("error signing out", error);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      //position="static"
      sx={{ backgroundColor: palette.white }}
      position="fixed"
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!state?.user ? (
            <Box sx={{ flexGrow: 1 }}>
              <img
                alt="og fitness"
                onClick={() => router.push("/")}
                src="/assets/oglogoblack.png"
                width={75}
              />
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem
                    key={index}
                    sx={{ color: palette.black }}
                    onClick={() => handleCloseNavMenu(page?.path)}
                  >
                    <Link href={page.path}>
                      {(router.pathname === "/more" &&
                        page?.name === "MyLog") ||
                      router?.pathname === page?.path ? (
                        <a
                          style={{
                            textDecoration: "none",
                            color: "black",
                            borderBottom: "2px solid black",
                          }}
                        >
                          {page.name}
                        </a>
                      ) : (
                        <a style={{ textDecoration: "none", color: "black" }}>
                          {page.name}
                        </a>
                      )}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          {state?.user && (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex", cursor: "pointer" },
              }}
            >
              <img
                alt={"og fitness"}
                onClick={() => router.push("/")}
                src="/assets/oglogoblack.png"
                width={75}
              />
            </Box>
          )}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {state?.user &&
              pages.map((page, index) => (
                <Link
                  key={index}
                  href={page.path}
                  onClick={() => handleCloseNavMenu(page?.name)}
                >
                  {(router.pathname === "/more" && page?.name === "Log") ||
                  router?.pathname === page?.path ? (
                    <a
                      style={{
                        textDecoration: "none",
                        color: palette.black,
                        borderBottom: "2px solid black",
                        marginRight: 15,
                      }}
                    >
                      {page.name}
                    </a>
                  ) : (
                    <a
                      style={{
                        color: palette.black,
                        textDecoration: "none",
                        marginRight: 15,
                      }}
                    >
                      {page.name}
                    </a>
                  )}
                </Link>
              ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {state?.user && (
              <Box>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  startIcon={<Person />}
                  color={"secondary"}
                  size="small"
                >
                  {state?.user?.attributes?.preferred_username}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
            {!state?.user && (
              <Grid item>
                <Link href="/auth/signin">
                  <a style={{ color: "#FFF", textDecoration: "none" }}>
                    SIGN IN
                  </a>
                </Link>
              </Grid>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
