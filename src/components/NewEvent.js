import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import uuid from "react-uuid";

import { makeStyles } from "@mui/styles";
import { collection, addDoc } from "firebase/firestore";
import firebase from "../firebase";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 50,
  },
}));

function NewEvent({ User, setUser }) {
  const history = useHistory();
  const classes = useStyles();
  const db = firebase.firestore();
  const [info, setinfo] = useState({
    EventName : '',
    Date : '',
    Address : '',
    City : '',
    State : '',
    Country : ''
  });

  const submit = async () => {
    setReq(true);
    // `http://api.positionstack.com/v1/forward?access_key=b23f36cc71d4eb84b18938cfcf237af9&query=${info.City} ${info.State} ${info.Country}`

    const res = await axios.get(
      `https://us1.locationiq.com/v1/search.php?key=pk.e996107eb98f15a3bd2f24611aa3b6ec&q=${info.City} ${info.State} ${info.Country}&format=json`
    );
    if (info.uid === undefined) {
      setinfo({ ...info, uid: User.uid });
    }
    console.log(User.uid);
    const docRef = addDoc(collection(db, "events"), {
      ...info,
      lat: res.data[0].lat,
      lng: res.data[0].lon,
      displayName: User.displayName,
      email: User.email,
      id: User.uid,
      interested: [],
    }).then((docRef) => {
      console.log(docRef);
      setReq(false);
      history.push("/");
      
    });
  };

  useEffect(() => {
    console.log(info);
  }, [info]);

  const [req, setReq] = useState(false);

  const handleDisabled = () => {
    if (
      info.EventName === '' ||
      info.Date === '' ||
      info.Address === '' ||
      info.City === '' ||
      info.State === '' ||
      info.Country === '' || 
      req === true
    ) {
      return true;
    } else {
      return false;
    }
  }



  return (
    <Box
      sx={{
        height: "100%",
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
            New Event
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
              label="Event Name"
              variant="standard"
              fullWidth
              sx={{
                margin: 5,
              }}
              value={info.EventName}
              onChange={(e) => {
                setinfo({ ...info, EventName: e.target.value });
              }}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              id="date"
              label="Date"
              type="date"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={info.Date}
              onChange={(e) => {
                setinfo({ ...info, Date: e.target.value });
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
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="Country"
            variant="standard"
            fullWidth
            sx={{
              margin: 5,
            }}
            value={info.Country}
            onChange={(e) => {
              setinfo({ ...info, Country: e.target.value });
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              padding: 2,
              marginTop: 10,
            }}
            onClick={() => submit()}
            disabled={handleDisabled()}

          >
            Create Event
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default NewEvent;
