import React, { useContext, useState } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

const ForgotPass = () => {
    const [sendEmail, setSendEmail] = useState(false);
    const {forgotPass} = useContext(AuthContext)
    const resetPassword = (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        forgotPass(email)
        .then(() => {
            setSendEmail(true);
            toast.success('Please Check Your Email For Reset Password', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })
        .catch(err => console.log(err))
    }
  return (
    <>
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
          <h1 className="text-center text-3xl font-bold mb-3">Reset Password</h1>
          <form onSubmit={resetPassword}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-800 font-bold">
                Give your email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

            <button disabled={sendEmail ? true : false} className="cursor-pointer py-2 px-4 block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold w-full text-center rounded disabled:cursor-not-allowed disabled:bg-red-600">
              Reset
            </button>
          </form>
        </div>
        {/* <p className="text-center mt-1">
          Don't Have an Account?&nbsp;
          <Link to="/signup" className="hover:text-blue-600">
            SignUp
          </Link>
        </p> */}
      </div>
    </>
  );
};

export default ForgotPass;
