import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Slide, ToastContainer, toast } from "react-toastify";


const Login = () => {
  const {logIn} = useContext(AuthContext);
  const redirect = useNavigate()
  const submitHandle = (event) => {
    event.preventDefault()
    
    const email = event.target.email.value;
    const password = event.target.password.value;

    logIn(email, password)
    .then(() => {
      // console.log(res.usr);
      redirect('/home')
    }).catch(err => {
      toast.error(`${err.code.replace('auth/', '')}`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    })
  }
  return (
    <div className="container mx-auto max-w-screen-xl px-3">
      <div className="max-w-md mx-auto py-6 px-8 mt-20 bg-white rounded shadow-xl">
      <div>
            <ToastContainer
              position="bottom-center"
              autoClose={1000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover={false}
              theme="colored"
              transition={Slide}
            />
          </div>
        <h1 className="text-center text-3xl font-bold mb-3">Log in</h1>
        <form onSubmit={submitHandle}>
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
            Login
          </button>
        </form>
      </div>
      <p className="text-center mt-1">
        Don't Have an Account?&nbsp;
        <Link to="/signup" className="hover:text-blue-600">
          SignUp
        </Link>
      </p>
    </div>
  );
};

export default Login;
