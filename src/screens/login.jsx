// authent
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// components
import EarthPanel from "../components/SignIn/EarthPanel";
import SignInPanel from "../components/SignIn/SignInPanel";
import { useEffect } from "react";

export default function Login({ auth }) {
  const [currentUser, currentLoading, authStateError] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentLoading) {
      if (currentUser) {
        navigate("/select-game");
      } else {
        if (authStateError) {
          console.error(authStateError.message);
        }
      }
    }
  }, [currentLoading, currentUser]);

  return (
    <div className="min-h-screen min-w-full grid grid-cols-1 lg:grid-cols-2">
      <EarthPanel></EarthPanel>
      <SignInPanel auth={auth}></SignInPanel>
    </div>
  );
}
