// authent
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import EarthPanel from "../components/SignIn/EarthPanel";
import SignInPanel from "../components/SignIn/SignInPanel";

export default function Login({ auth }) {
  const [currentUser, currentLoading, authStateError] = useAuthState(auth);
  const navigate = useNavigate();

  if (!currentLoading) {
    if (currentUser) {
      navigate("/");
    } else {
      if (authStateError) {
        console.error(authStateError.message);
      }
    }
  }

  return (
    <div className="min-h-screen min-w-full grid grid-cols-2">
      <EarthPanel></EarthPanel>
      <SignInPanel auth={auth}></SignInPanel>
    </div>
  );
}
