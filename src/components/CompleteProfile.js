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

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 50,
  },
}));

function CompleteProfile() {
  const classes = useStyles();

  const [info, setinfo] = useState({});

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "secondary.light",
        paddingBottom: 2,
      }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography
            variant="h4"
            color="primary.light"
            sx={{
              marginTop: 4,
            }}
          >
            Complete your profile
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={5}>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="standard"
              fullWidth
              sx={{
                margin: 5,
              }}
              value={info.Name}
              onChange={(e) => {
                setinfo({ ...info, Name: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="outlined-basic"
              label="Age"
              variant="standard"
              fullWidth
              sx={{
                margin: 5,
              }}
              value={info.Age}
              onChange={(e) => {
                setinfo({ ...info, Age: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Address"
              id="Address"
              variant="standard"
              sx={{
                margin: 5,
              }}
              value={info.Address}
              onChange={(e) => {
                setinfo({ ...info, Address: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          spacing={6}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={5}>
            <TextField
              id="outlined-basic"
              label="City"
              variant="standard"
              fullWidth
              sx={{
                margin: 5,
              }}
              value={info.City}
              onChange={(e) => {
                setinfo({ ...info, City: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              id="outlined-basic"
              label="State"
              variant="standard"
              fullWidth
              sx={{
                margin: 5,
              }}
              value={info.State}
              onChange={(e) => {
                setinfo({ ...info, State: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              padding: 2,
              marginTop: 10,
            }}

            onClick={() => {
                
            }}
          >
            Complete Your Profile
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CompleteProfile;
