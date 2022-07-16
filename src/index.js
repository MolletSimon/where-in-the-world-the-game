import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./screens/login";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Home from "./screens/home";
import Detail from "./screens/detail";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDVmzb5zPjTADG_uOUw641hZITvMKjcge4",
//   authDomain: "where-in-the-world-game.firebaseapp.com",
//   projectId: "where-in-the-world-game",
//   storageBucket: "where-in-the-world-game.appspot.com",
//   messagingSenderId: "304834358530",
//   appId: "1:304834358530:web:90d892309ef104dde5661b",
//   measurementId: "G-LT1C38389Q",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
