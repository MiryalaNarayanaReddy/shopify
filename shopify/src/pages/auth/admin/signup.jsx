import React, { useState } from 'react';
import axios from 'axios';
import { base_url } from '../../../helper';


function AdminSignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post (base_url + '/auth/admin/signup', {
            role: 'admin',
            name: name,
            email: email,
            password: password
        })
        .then((res) => {
            // console.log(res);
            if(res.status === 200){
                alert('Sign Up Successful');
                window.location.href = '/admin/login';
            }

        })
        .catch((err) => {
            alert('Sign Up Failed');
            console.log(err);
        });
    }



    return (
        <div className="flex flex-col items-center justify-center mt-16">

            <div className="w-1/3 mt-16 p-4 border-2 border-gray-200 rounded-md">
                <div className="text-4xl font-bold text-center">
                    Admin Sign Up
                </div>
                <div className="mt-4">
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-md" />
                </div>
                <div className="mt-4">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-md" />
                </div>
                <div className="mt-4">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border-2 border-gray-200 rounded-md" />
                </div>
                <div className="mt-4">
                    <button onClick={handleSubmit} className="w-full bg-black text-white p-2 rounded-md">Sign Up</button>
                </div>

                <div className="mt-4 text-center">
                    Already have an account? <a href="/admin/login" className="text-blue-500">Login</a>
                    </div>

            </div>
        </div>
    )

}

export default AdminSignUp;