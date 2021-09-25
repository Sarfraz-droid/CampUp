import React,{useState, useEffect} from "react";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./components/Home"
import Events from "./components/Events"
import NewEvent from "./components/NewEvent"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import firebase from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {

  const [User, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        console.log(user);
      } else {
        setUser(null);
        console.log("no user");
      }
    });
    
  }, [])

  return (<ThemeProvider theme={theme}>
    <Router>
      <Route>
        <Switch>
          <Route path="/login">
            <Login User={User} setUser={setUser}/>
          </Route>
          <Route path="/register">
            <Register user={User} setUser={setUser}/>
          </Route>
          <Route path="/events">
            <Navbar User={User} setUser={setUser}/>
            <Events User={User} setUser={setUser}/>
          </Route>
          <Route path="/new/event">
            <NewEvent User={User} setUser={setUser}/>
          </Route>
          <Route path="/">
            <Navbar User={User} setUser={setUser}/>
            <Home User={User} setUser={setUser}/>
          </Route>
        </Switch>
      </Route>
    </Router>
  </ThemeProvider>);
}

export default App;
