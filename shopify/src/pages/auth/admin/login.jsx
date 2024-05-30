import React, { useState } from 'react';
import axios from 'axios';


function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post ('http://localhost:5000/auth/admin/login', {
            email: email,
            password: password
        })
        .then((res) => {
            if(res.status === 200){
                window.location.href = '/admin/dashboard';
            }

        })
        .catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center mt-16">

            <div className="w-1/3 mt-16 p-4 border-2 border-gray-200 rounded-md">
                <div className="text-4xl font-bold text-center">
                    Admin Login
                </div>
                <div className="mt-4">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-md" />
                </div>
                <div className="mt-4">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-md" />
                </div>
                <div className="mt-4">
                    <button onClick={handleSubmit} className="w-full bg-black text-white p-2 rounded-md">Login</button>
                </div>

                <div className="mt-4 text-center">
                    Don't have an account? <a href="/admin/signup" className="text-blue-500">Sign Up</a>
                </div>

            </div>
        </div>
    )
    
}

export default AdminLogin;