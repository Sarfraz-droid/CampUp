import axios from "axios";

import { collection, getDocs } from "firebase/firestore";

import firebase from "../firebase";

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371;
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

async function Pos(city, country) {
  const db = firebase.firestore();
  let pos = {
    lat: 0,
    lng: 0,
  };

  const res = await axios.get(
    `http://api.positionstack.com/v1/forward?access_key=b23f36cc71d4eb84b18938cfcf237af9&query=${city} ${country}`
  );

  pos = {
    lat: res.data.data[0].latitude,
    lng: res.data.data[0].longitude,
  };

  console.log(`Your Position is ${pos.lat} and ${pos.lng}`);
  const querySnapshot = await getDocs(collection(db, "events"));
  console.log(querySnapshot);
  const doc_data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const lat = doc.data().lat;
    const lng = doc.data().lng;
    const distance = getDistanceFromLatLonInKm(pos.lat, pos.lng, lat, lng);
    doc_data.push({
      distance: distance,
      ...doc.data(),
      id : doc.id,
    });
  });

  doc_data.sort((a, b) => a.distance - b.distance);
  return doc_data;
}


export async function UpdateEvents(info,user){
    
  const db = firebase.firestore();

  const data = [
      ...info.interested,
      user.email
  ];

  await db.collection("events").doc(info.id).update({
      interested : data
  })

  return data;

}


export default Pos;
