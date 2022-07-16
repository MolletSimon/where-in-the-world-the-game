import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import LeftPanel from "../components/SignIn/LeftPanel";
import RightPanel from "../components/SignIn/RightPanel";

export default function Login({ auth }) {
  const [currentUser, currentLoading, authStateError] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  return (
    <div className="min-h-screen min-w-full grid grid-cols-2">
      <LeftPanel></LeftPanel>
      <RightPanel auth={auth}></RightPanel>
    </div>
  );
}
