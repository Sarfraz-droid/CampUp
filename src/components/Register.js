import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import firebase from "../firebase";
import { getAuth, createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";

import {useHistory,  Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 50,
  },
}));

function Login({User, setUser}) {
    
    const history = useHistory();

  const auth = firebase.auth();

  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    };

  const Register = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: Name
        }).then(() => {
          setUser(user);
          history.push("/");
        }).catch((error) => {
          // An error occurred
          // ...
        });
        

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.error(errorMessage);
        setErr(errorMessage);
        setOpen(true);
      });
  };

  const [email, setemail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [Name, setName] = useState("");
  const [btn, setbtn] = useState(false);
  const checkDisable = () => {
    if (email === "" || pass === "" || confirmpass === "" || Name === "") {
      setbtn(true);
    } else if (pass !== confirmpass) {
      setbtn(true);
    } else {
      setbtn(false);
    }
  };
  useEffect(() => {
    console.log(email);
    console.log(pass);
    console.log(confirmpass);
    checkDisable();
  }, [email, pass, confirmpass]);

  const classes = useStyles();
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
              Register
            </Typography>
          </Grid>

          <Grid item>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              type="password"
              variant="outlined"
              value={confirmpass}
              onChange={(e) => setConfirmpass(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "1 5",
                fontSize: "1.1rem",
              }}
              disabled={btn}
              onClick={() => Register()}
            >
              Register
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body1">
              Already have an account? <Link to="/login">Login Here</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={err}
      />
    </Box>
  );
}

export default Login;
