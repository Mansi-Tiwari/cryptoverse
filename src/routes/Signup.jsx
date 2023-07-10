import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Stars from "../component/Stars";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const toastSignUp = () =>
    toast.success("🎉 Congratulation your account created Successfully!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Fill all fields");
      return;
    }
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        setSubmitButtonDisabled(false);

        await setDoc(doc(db, "users", email), {
          watchList: [],
        });
        toastSignUp();
        navigate("/account");
      })
      .catch((e) => {
        setSubmitButtonDisabled(false);
        console.log(e.message);
        setError(e.message);
      });
  };
  return (
    <div className="  shadows mt-6 rounded-xl mx-auto bg-origin-border bg-center max-w-[500px] bg-gray-800 mb-5">
      <Stars />
      <div className="max-w-[400px] mx-auto text-white min-h-[600px] px-4 py-20">
        <div className="flex ">
          <h1 className="text-3xl text-white font-bold mx-auto mb-4">
            {" "}
            Create your Account
          </h1>
        </div>
        <h1 className="text-2xl font-bold">Sign Up</h1>
        {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}
        <form id="signUp" onSubmit={handleSubmit}>
          <div className="my-7">
            <label htmlFor="name">Name</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                id="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-4 p-2 bg-primary border border-input rounded-2xl"
                type="name"
              />
              <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
            </div>
            <label htmlFor="email">Email</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                id="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-4 p-2 bg-primary border border-input rounded-2xl"
                type="email"
              />
              <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <div className="my-7">
            <label htmlFor="password">Password</label>
            <div className="my-2 w-full relative rounded-2xl shadow-xl">
              <input
                autoComplete="new-password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 p-2 bg-primary border border-input rounded-2xl"
                type="password"
              />
              <AiFillLock className="absolute right-2 top-3 text-gray-400" />
            </div>
          </div>
          <button disabled={submitButtonDisabled} className="w-full gradient my-4 p-3 bg-button text-btnText rounded-2xl shadow-xl">
            Sign up
          </button>
        </form>
        <p className="my-4">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-accent border-b border-blue-200 text-blue-200"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
