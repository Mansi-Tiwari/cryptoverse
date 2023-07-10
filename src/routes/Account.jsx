import React from "react";
import SavedCoin from "../component/SavedCoins";
import { UserAuth } from "../context/AuthContext";
import {Navigate, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
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
  const handleSignOut = async () => {
    try {
      await logout();
      toastSignOut();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  if (user) {
    return (
      <div className="max-w-[1140px] mx-auto">
        <div className="flex justify-between items-center my-12 py-8 rounded-div">
          <div>
            <h1 className="text-2xl font-bold">Account</h1>
            <div>
              <p>Welcome, {user?.email}</p>
            </div>
          </div>
          <div>
            <button
              onClick={handleSignOut}
              className="border px-6 py-2 rounded-2xl shadow-lg hover:shadow-2xl"
            >
              Sign Out
            </button>
          </div>
        </div>
        <div className="flex justfiy-between items-center my-12 py-8 rounded-div">
          <div className="w-full min-h-[300px]">
            <h1 className="text-2xl font-bold py-4">Watch List</h1>
            <SavedCoin />
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/signin" />;
  }
};

export default Account;
