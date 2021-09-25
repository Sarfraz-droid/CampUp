import React from "react";

import { useHistory } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { SvgIcon, IconButton } from "@mui/material";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { getAuth, signOut } from "firebase/auth";

import { Stack } from "@mui/material";

function Navbar({ User, setUser }) {
  const history = useHistory();

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null);
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const startuser = () => {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Button color="secondary" onClick={() => history.push("/events")}>
          Events
        </Button>
        <Typography color="secondary">{User.displayName}</Typography>
        <IconButton
          color="secondary"
          aria-label="ExitToApp"
          onClick={() => handleSignOut()}
        >
          <ExitToAppIcon />
        </IconButton>
      </Stack>
    );
  };

  const notLoggedIn = () => {
    return (
      <Button color="secondary" onClick={() => history.push("/login")}>
        Login / Register
      </Button>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "primary.dark",
        }}
        elevation={2}
      >
        <Toolbar>
          <Link href="/" sx={{ flexGrow: 1 }}>
            <Typography variant="h6" color="secondary">
              CampUp
            </Typography>
          </Link>
          {User !== null ? startuser() : notLoggedIn()}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
