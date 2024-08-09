import UserProfile from '@/components/UserProfile';

export default function ProfilePage() {
  // In a real application, you'd fetch this data from an API or context
  const userType = 'patient'; // or 'patient'
  const userData = {
    doctorId: 'DOC123',
    name: 'Dr. Jane Smith',
    organization: 'AIIMS Delhi',
    // Include patient fields as well
    email: 'patient@example.com',
    gender: 'Female',
    location: 'Delhi, India',
  };

  return <UserProfile userType={userType} userData={userData} />;
}