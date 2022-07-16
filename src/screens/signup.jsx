// react
import { useEffect, useState } from "react";

// components
import EarthPanel from "../components/SignIn/EarthPanel";
import { Button } from "../components/Utils/Button";
import FormInput from "../components/Utils/FormInput";
import Title from "../components/Utils/Title";
import Loader from "../components/Utils/Loader";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

// auth
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Navigate, useNavigate } from "react-router-dom";

export default function SignUp({ auth }) {
  //form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

  // auth
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  // router
  const navigate = useNavigate();

  const verifyPassword = (confirm) => {
    if (password !== confirm) setPasswordConfirmed(false);
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
            borderColor={!passwordConfirmed && password ? `red` : "#e5e7eb"}
            setValue={(e) => verifyPassword(e)}
          />
          {!passwordConfirmed && password ? (
            <p className="text-rose-600">Password must be equals !</p>
          ) : (
            <></>
          )}

          <Terms
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            navigate={navigate}
          ></Terms>

          <Button
            background="#0E94D7"
            color="white"
            disabled={!termsAccepted || !passwordConfirmed}
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

function Terms(props) {
  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        className="mr-2 checked:bg-primary"
        name="terms"
        onChange={(e) => props.setTermsAccepted(!props.termsAccepted)}
        id=""
      />
      <h3>
        by clicking on Sign Up you agree{" "}
        <span
          className="text-primary cursor-pointer"
          onClick={() => props.navigate("/terms")}
        >
          to the terms and conditions
        </span>
      </h3>
    </div>
  );
}
