import React, { useState, useEffect } from "react";

import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Snackbar,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 50,
  },
}));

function Login({ User, setUser }) {
  const history = useHistory();
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  const handleSubmit = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        history.push("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setOpen({
          open: true,
          message: errorMessage,
        });
      });
  };

  const handleDisabled = () => {
    if (email === "" || password === "") {
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "primary.light",
      }}
    >
      <Paper
        className={classes.paper}
        elevation={5}
        sx={{
          backgroundColor: "secondary.light",
        }}
      >
        <Grid
          container
          spacing={3}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography variant="h4" color="primary.dark">
              Login
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={handleDisabled()}
              onClick={handleSubmit}
              sx={{
                padding: "1 5",
                fontSize: "1.1rem",
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Don't have an account? <Link href="/register">Register Here</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={open.open}
        autoHideDuration={6000}
        message={open.message}
        onClose={() => setOpen({ open: false, message: "" })}
      />
    </Box>
  );
}

export default Login;
