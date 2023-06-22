/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {BiUserCircle, BiLogIn} from 'react-icons/bi';

const Navbar = () => {
  const {currentUser, userType, logOut} = useContext(AuthContext);
  const redirect = useNavigate()
  const logOutHandle = () => {
    logOut()
      .then(() => {redirect('/')})
  }
  return (
    <>
      <div className="navbar bg-slate-700 text-white mb-2 max-w-full">
                <div className="navbar mx-auto flex-col md:flex-row">
                    <div className="flex-1">
                        <Link to='/home' className="btn btn-ghost normal-case text-xl">Exam Controll System</Link>
                    </div>
                    <div className="flex-none">
                      {currentUser ?  (currentUser && userType === 'admin' ? (
                            <ul className="menu menu-horizontal p-0 flex-col md:flex-row">
                                <li className=''><Link to='/add_course'>Add Course</Link></li>
                                <li className=''><Link to='/add_room'>Add Room</Link></li>
                                <li className=''><Link to='/routine'>Add Routine</Link></li>
                                <li className=''><Link to='/room_alloc'>Room Alloc</Link></li>
                                <li className=''><Link to='/profile'>{currentUser.displayName.replace('-admin', '')}<BiUserCircle /></Link></li>
                                <li className=''>
                                  <button onClick={logOutHandle}><BiLogIn />Log Out</button>
                                </li>
                            </ul>
                          ) : (
                            <ul className="menu menu-horizontal p-0 flex-col md:flex-row">
                                <li className=''><Link to='/input_schedule'>Exam Registration</Link></li>
                                <li className=''><Link to='/profile'>{currentUser && userType === 'teacher' ? currentUser.displayName.replace('-teacher', ''): ''}<BiUserCircle /></Link></li>
                                <li className=''>
                                  <button onClick={logOutHandle}><BiLogIn />Log Out</button>
                                </li>
                            </ul>
                          )
                        )
                        
                      : "WELCOME!"}
                        
                    </div>
                </div>
            </div>
    </>
  );
};

export default Navbar;
