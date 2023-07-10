import React, { useState } from "react";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Stars from "../component/Stars";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const toastSignIn = () =>
    toast.success("🎉 Sign In Successfully!", {
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
    setError("");
    try {
      await signIn(email, password);
      toastSignIn();
      navigate("/account");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className=" shadows mt-6 rounded-xl mx-auto bg-origin-border bg-center max-w-[500px] bg-gray-800 mb-5">
      <Stars />
      <div className="max-w-[400px]   mx-auto min-h-[600px] px-4 py-20">
        {/* {!error ? <p className="bg-red-100 p-3 my-2">{Toast}</p> : null } */}
        <h1 className="text-2xl text-white font-bold">Sign In</h1>
        {error ? <p className="bg-red-500 p-3 my-2">{error}</p> : null}
        <form id="signIn" onSubmit={handleSubmit}>
          <div className="my-6 text-md text-white">
            <label htmlFor="email">Email</label>
            <div className="my-2 w-full relative rounded-md shadow-xl">
              <input
              id="email"
              autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 pl-4 bg-primary  rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-300"
                type="email"
              />
              <AiOutlineMail className="absolute right-2 top-3 text-gray-600 mr-3" />
            </div>
          </div>
          <div className="my-6 text-md text-white">
            <label htmlFor="password">Password</label>
            <div className="my-2 w-full relative rounded-md shadow-xl">
              <input
              id="password"
              autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pl-4 bg-primary  rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-300 "
                type="password"
              />
              <AiFillLock className="absolute right-2 top-3 text-gray-600 mr-3" />
            </div>
          </div>
          <button className="w-full hover:text-white font-bold text-gray-600 my-4 p-3 hover:bg-blue-300 gradient   rounded-2xl transition ease-in-out text-md shadow-xl">
            Sign In
          </button>
        </form>

        <p className="my-5 text-white ">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-accent  text-blue-200 border-b border-purple-200 "
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
