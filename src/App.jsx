import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/Layout/header";
import Home from "./screens/home";
import Detail from "./screens/detail";
import { Navigate, Routes } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Login from "./screens/login";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

function App() {
  const [darkMode, setDarkmode] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  return (
    <Routes>
      <Route path="/" element={<Home auth={auth} />}>
        <Route path="test" element={<Test />} />
      </Route>
      <Route path="/login" element={<Login auth={auth} />} />
    </Routes>
  );
}

function Test() {
  return (
    <>
      <h1>test</h1>
    </>
  );
}

export default App;
