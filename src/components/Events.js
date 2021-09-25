import React, { useEffect, useState } from "react";

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
  Stack,
  SvgIcon
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { grey } from "@mui/material/colors";

import GetEvents from "../Calculations/GetEvents";

function Card(Info,User) {

  return (
    <Accordion
      sx={{
        width: 800,
        padding: 2,
        backgroundColor: grey[200]
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid container>
          <Grid item container spacing={5}>
            <Grid item>
              <Typography variant="h5" color="primary.dark">
                {Info.EventName}
              </Typography>
            </Grid>
              <Grid item>
                <Typography
                  variant="body1"
                  color="secondary.dark"
                  sx={{
                    padding: 1,
                    backgroundColor: "secondary.light",
                  }}
                >
                  {Info.State} , {Info.Country}
                </Typography>
              </Grid>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="body1" color="secondary.dark">
              By {Info.email}
            </Typography>
          </Grid>
          <Grid item container>
            <Stack direction="row" spacing={1}>
              <SvgIcon color={grey[400]}>
                <AccessTimeIcon
                  sx={{
                    color: grey[600],
                  }}
                />
              </SvgIcon>
              <Typography variant="body1" color={grey[600]} sx={{}}>
                {Info.Date}
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Typography variant="body1" color="primary.dark">
              {Info.Address}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="primary.dark">
                  Interested :
            </Typography>
            <Stack direction="row" spacing={1}>
            {Info.interested.map((data,index) => {
              return (
                <Typography variant="overline" color="primary.dark" sx={{
                  padding: 1,
                  backgroundColor: "secondary.light",
                }}>
                  {data}
                </Typography>
              );
            })}
            </Stack>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}


function Events(props) {
  const history = useHistory();

  const [info, setInfo] = useState({
    myevents : [],
    registeredevents : [],
  });

  useEffect(async () => {
    console.log(props.User);
    if (props.User !== null) {
      console.log("user");
      const data = await GetEvents(props.User.uid,props.User.email);
      setInfo(data);
      console.log(data);
    }
  }, [props.User]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: 2,
      }}
    >
      <Grid item>
        <Button variant="outlined" onClick={() => history.push("/new/event")}>
          Create a New Event
        </Button>
      </Grid>
      <Grid
        item
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          flexGrow: 1,
        }}
      >
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="left"
          sx={{
            marginTop: 2,
            width: "80vw",
          }}
          spacing={2}
        >
          <Grid item sx={{
            width: "100%"
          }}>
            <Typography
              variant="h5"
              color="primary"
              sx={{
                padding: 2,
                width: "100%",
              }}
            >
              My Events
            </Typography>
          </Grid>
          {info.myevents.map((data,index) => {
            return (
              <Grid item key={index}>
                {Card(data, index)}
              </Grid>
            );
          })}
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          alignItems="left"
          sx={{
            marginTop: 2,
            width: "80vw",
          }}
          spacing={2}
        >
          <Grid item sx={{
            width: "100%"
          }}>
            <Typography
              variant="h5"
              color="primary"
              sx={{
                padding: 2,
                width: "100%",
              }}
            >
              Registered Events
            </Typography>
          </Grid>
          {info.registeredevents.map((data,index) => {
            return (
              <Grid item key={index}>
                {Card(data, index)}
              </Grid>
            );
          })}
        </Grid>

      </Grid>
    </Grid>
  );
}

export default Events;
