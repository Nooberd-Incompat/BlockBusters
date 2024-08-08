'use client';

import { useState } from 'react';

export default function Login() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

                <form>
                    <div className="mb-4 min-h-[100px]">
                        <label className="block text-gray-700 text-sm font-bold mb-4" htmlFor="doctorId">
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="doctorId"
                            name="doctorId"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-[50%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                        >
                            Verify OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
