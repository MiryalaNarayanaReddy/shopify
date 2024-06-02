import React from 'react';
import { AdminNavBar } from '../../components/admin';
// have a side nav bar
import { ItemCard } from '../../components/ItemCards'
import { useEffect, useState } from 'react';

import AddProductPage from './addproduct';
import ViewProduct from './viewproduct';
import ViewAllOrders from './viewAllOrders';

function AdminDashboard() {

    const [selectedNavItem, setSelectedNavItem] = useState(''); // subnav items
    // viewproduct
    // addproduct
    // vieworder
    // viewuser

 

    return (

        <div className="grid grid-cols-8  md:grid-cols-12 mt-16">
            <div className="col-span-2  md:col-span-1 bg-gray-200 fixed h-screen ">
                <AdminNavBar selectedNavItem={selectedNavItem} setSelectedNavItem={setSelectedNavItem} />
            </div>
<div className="col-span-6 md:col-span-11 bg-gray-100 ml-[20%] p-4 justify-center items-center mt-10" >
            {
                selectedNavItem === 'viewproduct' ? <ViewProduct /> : <></>
            }
            {
                selectedNavItem === 'addproduct' ? <AddProductPage /> : <></>
            }
            {
                selectedNavItem === 'vieworder' ? <ViewAllOrders /> : <></>
            }
            {/* {
                selectedNavItem === 'viewuser' ? <h1>View Users</h1> : <></>
            } */}

           </div>

        </div>

    )
}



export default AdminDashboard;