
import React, { useState } from 'react';
import axios from 'axios';
import { base_url } from '../../helper';
import UserLogin from '../auth/user/login'
import AdminLogin from '../auth/admin/login'

function Login() {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 ">

            <div className='col-span-1'>
                <UserLogin />
            </div>


            <div className='col-span-1'>
                <AdminLogin />
            </div>
        </div>
    )


}

export default Login;