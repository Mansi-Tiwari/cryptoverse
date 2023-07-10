import logo from "../assets/favicon.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Select from "react-select";

import "react-toastify/dist/ReactToastify.css";
import { CryptoState } from "../context/CryptoContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  const handleNav = () => {
    setNav(!nav);
  };

  const filteredData = [
    { value: "inr", label: "INR" },
    { value: "usd", label: "USD" },
    { value: "btc", label: "BTC" },
    { value: "eur", label: "EUR" },
  ];
  const handleSignOut = async () => {
    try {
      await logout();
      toastSignOut();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const toastSignOut = () =>
    toast.info(" Sign out Successfully!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <div className=" px-8 text-white w-full mx-auto navbar flex items-center justify-between h-20 font-bold">
      <div className="flex flex-row items-center">
        <img src={logo} alt="logo" className="w-6 h-6 mr-3" />

        <Link to="/">
          <h1 className="text-2xl">Cryptoverse</h1>
        </Link>
      </div>
      <Select
        className="bg-gray-500 border mx-auto w-30 border-gray-300 hover:text-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="cryptocurrency"
        options={filteredData}
        onChange={(e) => setCurrency(e.value)}
        defaultValue={filteredData[0]}
      />
      {user?.email ? (
        <div className="hidden md:block">
          <ul className="flex flex-row gap-4">
            <li>
              <Link to={"/"}>HOME</Link>
            </li>

            <li>
              <Link to={"/exchanges"}>EXCHANGES</Link>
            </li>
            <li>
              <Link to={"/news"}>NEWS</Link>
            </li>
            <li>
              <Link
                to="/account"
                className="p-3 mr-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-indigo-300"
              >
                Account
              </Link>
              <Link to={"/"}>
                <button onClick={handleSignOut}>SIGN OUT</button>
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div className="hidden md:block">
          <div className="flex ">
            <ul className="flex flex-row gap-4">
              <li>
                <Link
                  to="/signin"
                  className="p-3 rounded-xl mr-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-indigo-300 hover:text-accent"
                >
                  SIGN IN
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="bg-button text-btnText px-5 py-2 rounded-xl shadow-lg hover:shadow-2xl"
                >
                  SIGN UP
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={
          nav
            ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%]  ease-in-out duration-300 z-10 bg-white text-gray-600"
            : "fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in-out duration-400"
        }
      >
        {user?.email ? (
          <div className="w-full p-4">
            <ul>
              <li onClick={handleNav} className="border-b py-6">
                <Link to={"/"}>HOME</Link>
              </li>

              <li onClick={handleNav} className="border-b py-6">
                <Link to={"/exchanges"}>EXCHANGES</Link>
              </li>
              <li onClick={handleNav} className="border-b py-6">
                <Link to={"/news"}>NEWS</Link>
              </li>

              <li onClick={handleNav} className="border-b py-6">
                <Link to="/account">ACCOUNT</Link>
              </li>
            </ul>
            <div className="flex flex-col w-full p-4 ">
              <Link to="/signin">
                <button
                  onClick={handleNav}
                  className="w-full my-2 p-3 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-indigo-300 text-primary border border-secondary rounded-2xl shadow-xl"
                >
                  SIGN IN
                </button>
              </Link>
              <Link onClick={handleSignOut} to={"/"}>
                <button className="w-full my-2 p-3 text-black bg-button text-btnText rounded-2xl shadow-xl">
                  SIGN OUT
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full p-4">
            <div onClick={handleNav} className="border-b py-6">
              <Link to={"/"}>HOME</Link>
            </div>

            <div className="flex flex-col w-full p-4 ">
              <Link to="/signin">
                <button
                  onClick={handleNav}
                  className="w-full my-2 p-3 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-400 hover:to-indigo-300 text-primary border border-secondary rounded-2xl shadow-xl"
                >
                  SIGN IN
                </button>
              </Link>
              <Link onClick={handleNav} to="/signup">
                <button className="w-full my-2 p-3 text-black bg-button text-btnText rounded-2xl shadow-xl">
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
