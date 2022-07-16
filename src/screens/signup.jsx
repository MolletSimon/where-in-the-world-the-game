import { useEffect, useState } from "react";
import EarthPanel from "../components/SignIn/EarthPanel";
import { Button } from "../components/Utils/Button";
import FormInput from "../components/Utils/FormInput";
import Title from "../components/Utils/Title";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Utils/Loader";

export default function SignUp({ auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const verifyPassword = (confirm) => {
    if (password != confirm) setPasswordConfirmed(false);
    else setPasswordConfirmed(true);
  };

  useEffect(() => {
    if (error) {
      toast.error(
        "Ow no 😔 it seems that we had trouble to create your account, try again !"
      );
    }
  }, [error]);

  if (loading) {
    return <Loader />;
  }
  if (user) {
    toast.success("Yay ! 😍 Your account has been created");
    return <Navigate to="/home" />;
  }

  return (
    <div className="grid grid-cols-2 min-w-full min-h-screen">
      <div>
        <Title text="Welcome !" />
        <div className="m-20">
          <FormInput
            label="Email"
            type="mail"
            name="Email"
            placeholder="Enter your email"
            setValue={setEmail}
          />
          <FormInput
            label="Password"
            type="password"
            name="Password"
            placeholder="*****"
            setValue={setPassword}
          />
          <FormInput
            label="Confirm your password"
            type="password"
            name="ConfirmPassword"
            placeholder="*****"
            borderColor={!passwordConfirmed && `rose-600`}
            setValue={(e) => verifyPassword(e)}
          />
          {!passwordConfirmed && password ? (
            <p className="text-rose-600">Password must be equals !</p>
          ) : (
            <></>
          )}

          <Button
            background="#0E94D7"
            color="white"
            text="Sign up"
            method={() => createUserWithEmailAndPassword(email, password)}
          ></Button>
        </div>
      </div>
      <EarthPanel />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
