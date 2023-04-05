import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RoomReg = () => {
    const [room, setRoom] = useState({});
    const [coloum, setColoum] = useState([]);

    const navigate = useNavigate();

    const coloumHandle = (e) => {
        let no = e.target.value;
        const noColoums = []
        for (let i = 1; i <= no; i++) {
            noColoums.push(i);
        }
        setColoum(noColoums);
    }

    const inputHandle = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newRoom = {...room};

        newRoom[field] = value;
        console.log(newRoom);
        setRoom(newRoom);
    }

    const roomHandle = event => {
        const field = event.target.name;
        const value = event.target.value;
        const preTotal = []
        const newRoom = {...room, total: 0};

        newRoom[field] = value;
        const attr = Object.keys(newRoom);
        console.log(attr)
        for(let i = 3; i < attr.length; i++) {

            preTotal.push(parseInt(newRoom[attr[i]]));
        };
        newRoom.total = preTotal.reduce((a, b) => a+b, 0)
        console.log(newRoom)
        setRoom(newRoom);
    }

    const submitHandle = e => {
        e.preventDefault();

        fetch('http://localhost:3001/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(room)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

        navigate('/');
    }


    return (
        <>
            <section>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <Link to='/'>
                            <FaArrowLeft />
                        </Link>
                        <form className="space-y-4" onSubmit={submitHandle}>
                            <legend className='text-center text-3xl font-bold underline'>Room Registration</legend>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {/* Room no */}
                                <div>
                                    <label className='font-medium text-gray-900'>Room No:</label>
                                    <input onBlur={inputHandle} id="countries" placeholder='Enter Room No' name='room_no' className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-slate-600 block w-full p-2.5 pr-4" />
                                </div>
                                {/* No of coloum */}
                                <div>
                                    <label className='font-medium text-gray-900'>No of Coloum:</label>
                                    <input required onBlur={inputHandle} onChange={coloumHandle} min='1' max='8' type="number" name="no__of_coloum" placeholder='Enter No of Coloum' className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm" />
                                </div>

                                {/* No of student per coloum */}
                                {
                                    coloum ? coloum.map((v, i) => (
                                        <div key={i}>
                                            <label className='font-medium text-gray-900'>Total students on coloum {v}:</label>
                                            <input onBlur={roomHandle} required type="number" name={`coloum_${v}`} placeholder='Enter total student number' className="w-full rounded-lg outline outline-1 outline-slate-300 focus:outline-slate-600 p-3 text-sm" />
                                        </div>
                                    )) : ''
                                }


                            </div>

                            {/* submit button */}
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 px-5 py-3 text-white sm:w-auto"
                                >
                                    <span className="font-medium">Submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default RoomReg;
