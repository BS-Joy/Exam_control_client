import React, { createContext, useEffect, useState } from 'react';
import {auth} from '../firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updatePassword, sendPasswordResetEmail, sendEmailVerification, getAuth } from 'firebase/auth';


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userType, setUserType] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);

    const author = getAuth();

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const emailVerification = () => {
        return sendEmailVerification(author)
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
            let name = ''
            if(user !== null){
                name = user.displayName
            }
            console.log(user);
            setLoading(false);
            if(user && user.displayName.includes('-teacher')) {
                setUserType('teacher');
                const displayName = name.replace('-teacher', '');
                // console.log(displayName)
                setUserName(displayName);
            } else if(user && user.displayName.includes('-admin')){
                setUserType('admin');
                const displayName = name.replace('-admin', '');
                // console.log(displayName)
                setUserName(displayName);
            } else return
        })


        return getUser;
    }, [userType]);

    const updatePass = (newPassword) => {
        return updatePassword(currentUser, newPassword);
    }

    const forgotPass = (email) => {
        return sendPasswordResetEmail(author, email);
    }

    const authTools = {
        currentUser, signUp, logIn, logOut, userType, userName, loading, updatePass, emailVerification, forgotPass
    }

    return (
        <AuthContext.Provider value={authTools}>
            {children}
        </AuthContext.Provider>
    );
}
