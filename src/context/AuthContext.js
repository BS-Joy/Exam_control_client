import React, { createContext, useEffect, useState } from 'react';
import {auth} from '../firebase.init';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase.init';


export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    const collection_name = 'users';
    const findAll = async () => {
        const doc_ref = await getDoc(doc(db, collection_name, 'R3zPqkMBraXIogY0Y7u18PUg4Ul1'));

        // console.log(doc_ref)

        // const res = [];

        // doc_ref.forEach(user => {
        //     res.push(user);
        //     console.log(user)
        // })
        const result = doc_ref.id;
        console.log(result)

        return result
    }

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const getUser = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        })


        return getUser;
    }, [])

    const authTools = {
        currentUser, signUp, logIn, findAll
    }

    return (
        <AuthContext.Provider value={authTools}>
            {children}
        </AuthContext.Provider>
    );
}
