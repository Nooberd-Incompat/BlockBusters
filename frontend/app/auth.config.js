const verifyUser = async () => {
    console.log("verify user")

    const user_auth_token = localStorage.getItem('user_auth_token');
    const authFormData = new FormData();
    authFormData.append('user_auth_token', user_auth_token);
        try {
            const response = await fetch('http://localhost:8000/auth/verify-otp', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                window.location.href = '/register';
            } 
        } catch (error) {
            window.alert(`Failed! ${error.message}`);
            console.error('Error submitting form:', error);
        }
    
};

export {verifyUser}