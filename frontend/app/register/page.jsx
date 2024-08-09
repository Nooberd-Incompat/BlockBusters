'use client';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import StethoscopeIcon from '@icons/stethoscope.svg';

import { useState, useEffect } from 'react';

export default function Register() {
    const [isDoctor, setIsDoctor] = useState(false);

    const [email, setEmail] = useState('');
    const [doctorId, setDoctorId] = useState('');
    // const [doctorName, setDoctorName] = useState('');
    const [organization, setOrganization] = useState('');
    const [gender, setGender] = useState('male');
    // const [location, setLocation] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     window.alert(`${isDoctor} ${email} ${doctorId} ${organization} ${gender}`);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        if (!otpSent) {
            formData.append('is_doctor', isDoctor.toString());
            formData.append('personal_email', email);
            formData.append('gender', gender);
            formData.append('doctor_id', doctorId);
            formData.append('doctor_organization', organization);

            try {
                const response = await fetch('http://localhost:8000/auth/register', {
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

    const clearForm = () => {
        setEmail('');
        setDoctorId('');
        // setDoctorName('');
        setOrganization('');
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
                        onClick={() => { setIsDoctor(false); clearForm(); }}
                    >
                        <AccessibilityNewIcon className='mx-2' />
                        Patient
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-lg ${isDoctor ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => { setIsDoctor(true); clearForm(); }}
                    >
                        <img src={StethoscopeIcon.src} className="h-6 w-6 mx-2 inline" alt="Doctor" />
                        Doctor
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-around'>
                    <div className='min-h-[350px] '>
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
                                        value={doctorId}
                                        onChange={(e) => setDoctorId(e.target.value)}
                                    />
                                </div>
                                {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorId">
                                    Doctor's Name
                                </label>
                                <input
                                    type="text"
                                    id="doctorId"
                                    name="doctorId"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div> */}
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
                                        value={organization}
                                        onChange={(e) => setOrganization(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                {/* <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div> */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                                        Gender
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="non-binary">Non-Binary</option>
                                    </select>
                                </div>
                                {/* 
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
                             */}
                            </>

                        )}

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
