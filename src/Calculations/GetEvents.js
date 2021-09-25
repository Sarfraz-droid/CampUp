import axios from "axios";

import { collection, getDocs } from "firebase/firestore";

import firebase from "../firebase";

async function GetEvents(userId,email) {
    const db = firebase.firestore();
    const querySnapshot = await getDocs(collection(db, "events"));
    console.log(querySnapshot);
    const myEvents = [];
    const RegisteredEvents = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshot
        if(doc.data().id === userId) {
            myEvents.push(doc.data());
        }

        if(doc.data().interested.includes(email)) {
            RegisteredEvents.push(doc.data());
        }
    });

    return {
        myevents : myEvents,
        registeredevents : RegisteredEvents
    }
}


export default GetEvents;