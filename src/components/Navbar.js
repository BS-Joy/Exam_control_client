/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <>
            <div className="navbar bg-slate-700 text-white mb-8">
                <div className="navbar mx-auto">
                    <div className="flex-1">
                        <Link to='/' className="btn btn-ghost normal-case text-xl">Exam Controll</Link>
                    </div>
                    <div className="flex-none">
                        <ul className="menu menu-horizontal p-0">
                            <li><Link to='/input_schedule'>Exam Registration</Link></li>
                            <li><Link to='/routine'>Add Routine</Link></li>
                            <li><Link to='/room'>Room Reg</Link></li>
                            <li><Link to='/room_alloc'>Room Alloc</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
