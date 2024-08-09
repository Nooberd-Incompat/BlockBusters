import React from 'react';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import StethoscopeIcon from '@icons/stethoscope.svg';
// import { Card, CardHeader, CardContent } from '@/components/ui/card';

const ProfileField = ({ label, value }) => (
    <div className="mb-4">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
);

export default function UserProfile({ userType, userData }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {userType === 'doctor' ? 'Doctor Profile' : 'Patient Profile'}
                        </h2>
                        {userType === 'doctor' ? (
                            <img src={StethoscopeIcon.src} className="h-6 w-6 mx-2 inline" alt="Doctor" />
                        ) : (
                            <AccessibilityNewIcon className="h-8 w-8 text-blue-500" />
                        )}
                    </div>
                    <div className="space-y-6">
                        {userType === 'doctor' ? (
                            <>
                                <ProfileField label="Doctor ID" value={userData.doctorId} />
                                <ProfileField label="Name" value={userData.name} />
                                <ProfileField label="Organization" value={userData.organization} />
                            </>
                        ) : (
                            <>
                                <ProfileField label="Email" value={userData.email} />
                                <ProfileField label="Gender" value={userData.gender} />
                                <ProfileField label="Location" value={userData.location || 'Not specified'} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}