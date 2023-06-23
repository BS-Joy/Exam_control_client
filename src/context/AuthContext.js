import React, { createContext, useEffect, useState } from 'react';
import {auth} from '../firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState(true)

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const getUser = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            // console.log(user)
            setLoading(false);
            if(user && user.displayName.includes('-teacher')) {
                setUserType('teacher')
            } else if(user && user.displayName.includes('-admin')){
                setUserType('admin')
            } else return
        })


        return getUser;
    }, [userType])

    const authTools = {
        currentUser, signUp, logIn, logOut, userType, loading
    }

    return (
        <AuthContext.Provider value={authTools}>
            {children}
        </AuthContext.Provider>
    );
}
