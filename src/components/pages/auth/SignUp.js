import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { getAuth, updateProfile } from "firebase/auth";

const SignUp = () => {
  const { signUp } = useContext(AuthContext);
  const auth = getAuth()

  const submitHandle = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const pass = event.target.password.value;

    const teacher_name = name.concat('-teacher')

    signUp(email, pass)
    .then((result) => {
      updateProfile(auth.currentUser, {
        displayName: teacher_name
      })
      console.log(result.user);
    })

    event.target.reset()
  }
  return (
    <div className="container mx-auto max-w-screen-xl px-3">
      <div className="max-w-md mx-auto py-6 px-8 mt-20 bg-white rounded shadow-xl">
        <h1 className="text-center text-3xl font-bold mb-3">Sign Up</h1>
        <form action="#" onSubmit={submitHandle}>
          {/* Name */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-800 font-bold">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="name"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>

          {/* email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-bold">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-800 font-bold">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
            <Link
              to="#"
              className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
            >
              Forget Password?
            </Link>
          </div>

          <button className="cursor-pointer py-2 px-4 block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold w-full text-center rounded">
            Sign Up
          </button>
        </form>
      </div>
      <p className="text-center mt-1">
        Already Have an Account?&nbsp;
        <Link to="/login" className="hover:text-blue-600">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;