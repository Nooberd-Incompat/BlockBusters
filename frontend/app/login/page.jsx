'use client';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import StethoscopeIcon from '@icons/stethoscope.svg';
// import StethoscopeIcon from '../icons/s.svg';

import { useState } from 'react';

export default function Login() {
    const [isDoctor, setIsDoctor] = useState(false);

    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (!otpSent) {
            formData.append('is_doctor', isDoctor.toString());
            formData.append('personal_email', email);
            try {
                const response = await fetch('http://localhost:8000/auth/login', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    if (data.otp_token) {
                        localStorage.setItem('otp_token', data.otp_token);
                        localStorage.setItem('user_exist', data.user_exist);
                        setOtpSent(true);
                        // window.alert("OTP sent successfully!");
                    } else {
                        window.alert("OTP token not received from server");
                    }
                } else {
                    const errorData = await response.json();
                    window.alert(errorData.message || response.statusText);
                }
            } catch (error) {
                window.alert(`Failed! ${error.message}`);
                console.error('Error submitting form:', error);
            }
        } else {
            const otp_token = localStorage.getItem('otp_token');
            const user_exist = localStorage.getItem('user_exist');

            formData.append('otp', verificationCode);
            formData.append('otp_token', otp_token);
            formData.append('user_exist', user_exist);

            try {
                const response = await fetch('http://localhost:8000/auth/verify-otp', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    localStorage.setItem('user_auth_token', data.user_auth_token);
                    console.log('User Auth Token:', data.user_auth_token);
                    window.location.href = '/dashboard';
                    // window.alert("Otp Sent successfully!");
                } else {
                    window.alert(response.statusText);
                }
            } catch (error) {
                window.alert(`Failed! ${error.message}`);
                console.error('Error submitting blog:', error.message);
            }

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
                <form onSubmit={handleSubmit}>
                    <div className='min-h-[200px] '>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email ID
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {otpSent && (
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verificationCode">
                                Verification Code
                            </label>
                            <input
                                type="text"
                                id="verificationCode"
                                name="verificationCode"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                placeholder="Enter verification code"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                    )}

                    <div className="w-full flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-[50%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
                        >
                            Send OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
