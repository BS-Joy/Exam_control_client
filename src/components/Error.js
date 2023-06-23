import React from 'react';
import { useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();
    return (
        <>
            <div className='bg-red-500 text-white'>
                <div className="h-screen flex flex-col justify-center items-center gap-2">
                    <img className='w-60' src="https://upload.wikimedia.org/wikipedia/commons/6/63/Twemoji_1f632.svg" alt="error" />
                    <h1 className='text-3xl'>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p className='p-2 text-center font-bold bg-stone-300 shadow-stone-300 shadow-lg rounded text-red-500'>
                        Error: <i>{error.statusText || error.message}</i>
                    </p>
                </div>

            </div>
        </>
    );
}

export default Error;