import React, { useEffect, useState } from 'react';


function Profile() {

    const [user, setUser] = useState({});

    useEffect(() => {

        if (localStorage.getItem('token') === null) {
            window.location.href = '/login';
        }
        else if (localStorage.getItem('admin') !== null) {
            setUser(JSON.parse(localStorage.getItem('admin')));
        }
        else {
            setUser(JSON.parse(localStorage.getItem('user')))
        }

    }, []);


    return (
        <div className="flex flex-col items-center justify-center mt-16">
            <div className="w-1/3 mt-16 p-4 border-2 border-gray-200 rounded-md shadow-lg">
                <div className="text-4xl font-bold text-center">

                    {user.role === 'admin' ? 'Admin Profile' : 'User Profile'}
                </div>

                <div className="mt-4">
                    <div className="text-xl "> <span className="font-bold">Name:</span> {user.name}</div>
                </div>
                <div className="mt-4">
                    <div className="text-xl "> <span className="font-bold">Email:</span> {user.email}</div>
                </div>
            </div>
        </div>


    );
}

export default Profile;