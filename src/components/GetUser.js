import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const GetUser = () => {
    const {findAll} = useContext(AuthContext)
    findAll()
    return (
        <div>
            a
        </div>
    );
}

export default GetUser;
