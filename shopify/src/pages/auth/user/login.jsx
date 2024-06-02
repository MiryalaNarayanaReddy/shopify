
import React, { useState } from 'react';
import axios from 'axios';
import { base_url } from '../../../helper';

function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post (base_url + '/auth/user/login', {
            email: email,
            password: password
        })
        .then((res) => {
            if(res.status === 200){

               
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));

                alert(res.data.message)


                window.location.href = '/';
            }

        })
        .catch((err) => {
            alert('Login Failed')
            console.log(err);
        });
    }

    return (
        <div className="flex flex-col items-center justify-center mt-16">

            <div className="w-2/3 mt-16 p-4 border-2 border-gray-200 rounded-md">
                <div className="text-4xl font-bold text-center">
                    Login
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
                    Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
                </div>

            </div>
        </div>
    )


}

export default Login;