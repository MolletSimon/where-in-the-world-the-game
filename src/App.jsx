// router
import { Routes, Route } from "react-router-dom";

// screens
import Home from "./screens/home";
import Login from "./screens/login";
import SignUp from "./screens/signup";

// firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebase-config";
import Terms from "./screens/terms";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home auth={auth} />}></Route>
      <Route path="/login" element={<Login auth={auth} />} />
      <Route path="/signup" element={<SignUp auth={auth} />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;
