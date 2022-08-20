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
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase-config";
import Terms from "./screens/terms";
import SelectGame from "./screens/selectGame";
import Flag from "./Games/flag/screens/flag";
import Population from "./Games/population/screens/population";
import User from "./screens/user";
import Investigation from "./Games/investigation/screens/investigation";
import Borders from "./Games/borders/screens/borders";
import Capital from "./Games/capital/screens/capital";
import Find from "./Games/find/screens/find";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home auth={auth} />}>
        <Route path="/select-game" element={<SelectGame />} />
        <Route path="/flag" element={<Flag />} />
        <Route path="/investigation" element={<Investigation />} />
        <Route path="/population" element={<Population />} />
        <Route path="/borders" element={<Borders />} />
        <Route path="/findletter" element={<Find />} />
        <Route path="/capital" element={<Capital />} />
        <Route path="/user" element={<User auth={auth} />} />
      </Route>
      <Route path="/login" element={<Login auth={auth} />} />
      <Route path="/signup" element={<SignUp auth={auth} />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}

export default App;
