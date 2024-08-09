'use client';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import StethoscopeIcon from '@icons/stethoscope.svg';
import { useState } from 'react';
import Web3 from 'web3';

// Declare the 'ethereum' property on the window object
declare global {
    interface Window {
        ethereum?: any;
    }
}

export default function Register() {
    const [isDoctor, setIsDoctor] = useState(false);
    const [metaMaskAddress, setMetaMaskAddress] = useState('');

    // Function to connect to MetaMask and get the address
    const connectMetaMask = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setMetaMaskAddress(accounts[0]);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

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
                    <div className='min-h-[350px]'>
                        {/* Existing form fields */}
                        {isDoctor ? (
                            <>
                                {/* Doctor fields */}
                                {/* ... */}
                            </>
                        ) : (
                            <>
                                {/* Patient fields */}
                                {/* ... */}
                            </>
                        )}
                        {/* MetaMask address field */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaMaskAddress">
                                MetaMask Address
                            </label>
                            <div className="flex">
                                <input
                                    type="text"
                                    id="metaMaskAddress"
                                    name="metaMaskAddress"
                                    value={metaMaskAddress}
                                    onChange={(e) => setMetaMaskAddress(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={connectMetaMask}
                                >
                                    Connect MetaMask
                                </button>
                            </div>
                        </div>
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
