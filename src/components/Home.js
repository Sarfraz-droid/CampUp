import React, { useState, useEffect } from "react";
import {
  Grid,
  IconButton,
  TextField,
  Typography,
  Paper,
  Stack,
  Button,
  SvgIcon,
  Snackbar,
} from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { grey } from "@mui/material/colors";

import Search, { UpdateEvents } from "../Calculations/EventSearch";

function Home(props) {
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");

  const [SearchResult, setSearchResult] = useState([]);

  const HandleQuery = async (e) => {
    if (props.User === null || props.User === undefined) {
      setopen({
        message: "Please Login to use this feature",
        state: true,
      });
    } else {
      const data = await Search(City, Country);
      setSearchResult(data);
    }
  };

  const [open, setopen] = useState({
    message: "",
    state: false,
  });

  useEffect(() => {
    console.log(SearchResult);
  }, [SearchResult]);

  function Card(Info, User, index) {
    const onChange = async () => {
      const obj = await UpdateEvents(Info, User);
      setSearchResult((data) => {
        data[index].interested = obj;
        return [...data];
      });

      setopen({
        message: "Event Updated",
        state: true,
      });
    };

    return (
      <Accordion
        sx={{
          width: 800,
          padding: 2,
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Grid container>
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="h5" color="primary.dark">
                  {Info.EventName}
                </Typography>
              </Grid>
              <Grid item container>
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
              {Info.interested.includes(User.email) == false ? (
                <Button onClick={() => onChange()}>I am Interested</Button>
              ) : (
                <Button disabled={true}>You Have Filled in</Button>
              )}
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: 2,
      }}
      spacing={2}
    >
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="body1" component="h1">
            Find Events in
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="filled"
            label="City"
            variant="filled"
            value={City}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1" component="h1">
            At
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="filled"
            label="Country"
            variant="filled"
            value={Country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          />
        </Grid>
        <Grid item>
          <IconButton onClick={() => HandleQuery()}>
            <SearchOutlinedIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        item
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {SearchResult.map((Info, index) => {
          {
            return (
              <Grid item key={index}>
                {Card(Info, props.User, index)}
              </Grid>
            );
          }
        })}
      </Grid>
      <Snackbar
        open={open.state}
        autoHideDuration={6000}
        onClose={() => setopen({ ...open, state: false })}
        message={open.message}
      />
    </Grid>
  );
}

export default Home;
