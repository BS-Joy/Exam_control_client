import React, { useContext, useState } from 'react';
import { Slide, ToastContainer, toast } from "react-toastify";
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const [passChanged, setPassChanged] = useState(false);

    const {updatePass} = useContext(AuthContext);
    const redirect = useNavigate();

    const updatePassword = (event) => {
        event.preventDefault();

        const password = event.target.password.value;
        updatePass(password)
        .then(() => {
            setPassChanged(true);
            toast.success('Password is changed', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            redirect('/')
        })
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
          <form onSubmit={updatePassword}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-800 font-bold">
                Enter Your New Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="New Password"
                className="w-full border border-gray-300 py-2 pl-3 rounded mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
              />
            </div>

            <button disabled={passChanged ? true : false} className="cursor-pointer py-2 px-4 block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold w-full text-center rounded disabled:cursor-not-allowed disabled:bg-red-600">
              Update Password
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
}

export default UpdatePassword;
