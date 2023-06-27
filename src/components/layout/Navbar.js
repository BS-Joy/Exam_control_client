/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {BiUserCircle, BiLogIn} from 'react-icons/bi';
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";
import './../styles/navbar.css'

const Navbar = () => {
  const {currentUser, userType, logOut} = useContext(AuthContext);
  const redirect = useNavigate()
  const logOutHandle = () => {
    logOut()
      .then(() => {redirect('/')})
  }
  return (
    <>
      <nav>
          <div className="nav-container design">
            <Link to='/' className="logo">Exam Controll System</Link>
            {currentUser ? (
              <>
              <input type="checkbox" id="check" />
              <label for="check" className="checkbtn">
                  <IconContext.Provider value={{color: 'white', size:'1.5rem'}}>
                    <FaBars />
                  </IconContext.Provider>
              </label>
              </>
              
            ) : 
            ''
            }
            
            {currentUser ?  (currentUser && userType === 'admin' ? (
                            <ul className="menus">
                                <li className=''><Link to='/add_course'>Add Course</Link></li>
                                <li className=''><Link to='/add_room'>Add Room</Link></li>
                                <li className=''><Link to='/routine'>Add Routine</Link></li>
                                <li className=''><Link to='/room_alloc'>Room Alloc</Link></li>
                                <li className=''><Link className="flex items-center justify-center gap-1" to='/profile'>{currentUser.displayName.replace('-admin', '')}<BiUserCircle /></Link></li>
                                <li className=''>
                                  <button className="flex items-center mx-auto gap-1 text-white" onClick={logOutHandle}><BiLogIn />Log Out</button>
                                </li>
                            </ul>
                          ) : (
                            <ul className="menus">
                                <li className=''><Link to='/input_schedule'>Exam Registration</Link></li>
                                <li className=''>
                                  <Link className="flex items-center justify-center gap-1" to='/profile'>{currentUser && userType === 'teacher' ? currentUser.displayName.replace('-teacher', ''): ''}<BiUserCircle /></Link>
                                </li>
                                <li className=''>
                                  <button className="flex items-center mx-auto text-white gap-1" onClick={logOutHandle}><BiLogIn />Log Out</button>
                                </li>
                            </ul>
                          )
                        )
                        
                      : 
                      <h1 className="text-white">WECOME!</h1>
                    }
        </div>
    </nav>

    </>
  );
};

export default Navbar;
