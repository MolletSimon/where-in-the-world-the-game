import FormInput from "../Utils/FormInput";
import Subtitle from "../Utils/Subtitle";
import Title from "../Utils/Title";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { useState } from "react";

export default function RightPanel({ auth }) {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, userEmail, loadingEmail, errorEmail] =
    useSignInWithEmailAndPassword(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(user);

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
          setValue={(e) => setEmail(e.target.value)}
        />
        <FormInput
          label="Password"
          name="Password"
          type="password"
          placeholder="Enter your password"
          setValue={(e) => setPassword(e.target.value)}
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
    </div>
  );
}
