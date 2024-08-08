'use client';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import StethoscopeIcon from '@icons/stethoscope.svg';

import { useState } from 'react';

export default function Register() {
    const [isDoctor, setIsDoctor] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Register as {isDoctor ? 'Doctor' : 'Patient'}
                </h2>
                <div className="mb-6 flex justify-center">
                    <button
                        className={`px-4 py-2 rounded-l-lg ${isDoctor ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        onClick={() => setIsDoctor(false)}
                    >
                        <AccessibilityNewIcon className='mx-2' />
                        Patient
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-lg ${isDoctor ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => setIsDoctor(true)}
                    >
                        <img src={StethoscopeIcon.src} className="h-6 w-6 mx-2 inline" alt="Doctor" />
                        Doctor
                    </button>
                </div>
                <form className='flex flex-col justify-around'>
                    <div className='min-h-[350px] '>
                    {isDoctor ? (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorId">
                                    Doctor Identification Number
                                </label>
                                <input
                                    type="text"
                                    id="doctorId"
                                    name="doctorId"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorId">
                                    Doctor's Name
                                </label>
                                <input
                                    type="text"
                                    id="doctorId"
                                    name="doctorId"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorId">
                                    Organization
                                </label>
                                <input
                                    type="text"
                                    id="doctorId"
                                    name="doctorId"
                                    placeholder='eg: AIIMS Delhi'
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email ID
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="non-binary">Non-Binary</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                                    Location (Optional)
                                </label>
                                <input
                                    type="Text"
                                    id="location"
                                    name="location"
                                    placeholder='country, state'
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </>

                    )}
                    </div>
                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-[50%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
