// components
import FormInput from "../Utils/FormInput";
import Subtitle from "../Utils/Subtitle";
import Title from "../Utils/Title";
import Loader from "../Utils/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../Utils/Button";

// auth
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

// react
import { useState, useEffect } from "react";

// router
import { Navigate, useNavigate } from "react-router-dom";

export default function SignInPanel({ auth }) {
  // auth
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, userEmail, loadingEmail, errorEmail] =
    useSignInWithEmailAndPassword(auth);

  //form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // router
  const navigate = useNavigate();

  useEffect(() => {
    if (error || errorEmail) {
      toast.error(
        "Woups ! 😭 it seems that the authentication has failed, please check your credentials and try again"
      );
    }
  }, [error, errorEmail]);

  if (loading || loadingEmail) {
    return <Loader />;
  }
  if (user || userEmail) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="m-5">
      <Title text="Hello there !" />
      <Subtitle text="Please enter your details" />

      <form className="flex flex-col mt-10 ml-28 mr-28 justify-center items-center">
        <FormInput
          label="Email"
          name="Email"
          type="mail"
          placeholder="Enter your email"
          setValue={setEmail}
          borderColor="lightInput"
        />
        <FormInput
          label="Password"
          name="Password"
          type="password"
          placeholder="Enter your password"
          setValue={setPassword}
          borderColor="lightInput"
        />
        <Button
          background="#0E94D7"
          color="white"
          method={() => signInWithEmailAndPassword(email, password)}
          text="Sign in"
        ></Button>
        <Button
          background="white"
          color="black"
          method={() => signInWithGoogle()}
          text="Sign in with google"
          icon="icons/google.png"
        ></Button>
      </form>

      <h4 className="font-normal text-center mt-8">
        Don't have an account ?{" "}
        <span
          className="font-semibold text-primary cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </h4>
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
