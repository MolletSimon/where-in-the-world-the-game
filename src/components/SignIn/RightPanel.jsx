import FormInput from "../Utils/FormInput";
import Subtitle from "../Utils/Subtitle";
import Title from "../Utils/Title";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import Loader from "../Utils/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RightPanel({ auth }) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, userEmail, loadingEmail, errorEmail] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        />
        <FormInput
          label="Password"
          name="Password"
          type="password"
          placeholder="Enter your password"
          setValue={setPassword}
        />
        <button
          className="border-2 w-full p-2 rounded-md bg-primary text-white mb-3"
          onClick={() => signInWithEmailAndPassword(email, password)}
        >
          Sign in
        </button>
        <button
          className="border-2 w-full p-2 rounded-md flex justify-center items-center"
          onClick={() => signInWithGoogle()}
        >
          <img src="icons/google.png" width="20" className="mr-3" />
          Sign in with Google
        </button>
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
