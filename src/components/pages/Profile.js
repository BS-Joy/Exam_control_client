import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BsMailbox } from "react-icons/bs";
import { BsPhone } from "react-icons/bs";
import diuIcon from "../../assets/images/diuIcon.png"

const Profile = () => {
    const {currentUser, userType, userName} = useContext(AuthContext);
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
        {/*  <!-- Image --> */}
        <figure className="p-6 pb-0">
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full text-white">
            <img
              src={diuIcon}
              alt="user name"
              title="user name"
              width="80"
              height="80"
              className="max-w-full rounded-full"
            />
          </span>
        </figure>
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4 mx-auto max-w-fit">
            <h3 className="text-xl font-medium text-slate-700">
              Name: {userName}
            </h3>
            <p className="text-left flex justify-between gap-4"><span className="text-black">User Type:</span> {userType}</p>
            <p className="text-left flex justify-between gap-4"><span className="text-black">Email:</span> {currentUser.email ? currentUser.email : 'Not Found'}</p>
            {/* <p className="text-left flex justify-between gap-4"><span className="text-black">Phone:</span> {currentUser.phoneNumber ? currentUser.phoneNumber : 'Not addeded yet'}</p> */}
          </header>
        </div>
        {/*  <!-- Action base sized with lead icon buttons  --> */}
        <div className="md:flex-row flex flex-col md:justify-end gap-3 p-6 pt-0">
          <Link to='/change_Pass' className="rounded bg-emerald-500 py-3 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none">
            Change Password
          </Link>
          {/* <button className="rounded bg-emerald-500 py-3 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none">
            Forgot Password ?
          </button> */}
          {/* <button className="rounded bg-emerald-500 py-3 px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none">
            Update Profile
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
