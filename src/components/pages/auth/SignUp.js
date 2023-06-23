import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { getAuth, updateProfile } from "firebase/auth";

const SignUp = () => {
  const [passValidation, setPassValidation] = useState(false);
  const { signUp, logOut } = useContext(AuthContext);
  const [showPass, setShowPass] = useState(false);
  const auth = getAuth();
  const redirect = useNavigate();

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{5,}$/;


  const submitHandle = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const pass = event.target.password.value;

    const teacher_name = name.concat('-teacher');

    signUp(email, pass)
    .then((result) => {
      updateProfile(auth.currentUser, {
        displayName: teacher_name
      })
      console.log(result)
      logOut().then(redirect('/'))
    })

    event.target.reset()
  }

  const showPassword = (event) => {
    const show = event.target.checked;
    if(show) {
      setShowPass(true)
    } else {
      setShowPass(false)
    }
  }

  const checkPass = (event) => {
    const pass = event.target.value;
    if(passwordRegex.test(pass)){
      setPassValidation(true)
    } else {
      setPassValidation(false)
    }
  }


  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
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
              onChange={checkPass}
              type={`${showPass ? 'text': 'password'}`}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            />
            <input type="checkbox" onChange={showPassword} name="show_pass" id="show-pass" />
            <label htmlFor="show_pass">Show Password</label>
            <div className={`text-sm ${passValidation ? "text-black" : "text-red-600"} `}>
              <p className="font-bold">* Password must contain:</p>
              <ul className="list-disc list-inside">
                <li>Minimum length of 5 characters</li>
                <li>At least one capital letter</li>
                <li>At least one special character</li>
              </ul>
            </div>
            <Link
              to="#"
              className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600"
            >
              Forget Password?
            </Link>
          </div>

          <button disabled={passValidation ? false : true} className={`disabled:bg-red-500 cursor-pointer py-2 px-4 block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold w-full text-center rounded`}>
            Sign Up
          </button>
        </form>
      </div>
      <p className="text-center mt-1 mb-16">
        Already Have an Account?&nbsp;
        <Link to="/" className="hover:text-blue-600">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
