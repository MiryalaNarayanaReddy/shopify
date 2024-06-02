import Logo from '../assets/icons/logo_big.png'
import CartIcon from '../assets/icons/cart_icon.png'
import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import Profile from '../pages/auth/Profile';

function NavItem({ title, link, selected, onclick }) {
    return (
        <div className="text-xl" >

            <a href={link} className={` ${selected ? 'border-b-2 border-red-600' : ''}`} onClick={onclick}>
                {title}
            </a>
        </div>

    )
}


function NavBar({ selectedNavItem, cart }) {

    // const [cartItems, setCartItems] = useState(null);


    // 

    // console.log(selectedNavItem);


    const navclick = (e, title) => {
        console.log(selectedNavItem);

        if (selectedNavItem === title) {
            e.preventDefault();
            return;
        }


        // e.preventDefault();
        // setSelectedNavItem(title);

        localStorage.setItem('category', title);

        window.location.href = '/collections/' + title;
    }


    return (
        <div className="flex flex-row justify-around bg-white shadow-lg fixed top-0 w-full z-10 h-16 items-center">

            {/*  website name */}
            <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
                <div>
                    <img src={Logo} alt="icon" className="w-10 h-10" />
                </div>

                <div className="text-2xl font-bold" >
                    SHOPIFY
                </div>
            </div>

            {/* items */}

            <div className="grid grid-cols-5 gap-4">

                {
                    localStorage.getItem('admin') ? (
                        <div className="col-span-1">
                            <NavItem title="Dashboard" link="/admin/dashboard" selected={selectedNavItem === 'dashboard'} onclick={(e) => navclick(e, 'dashboard')} />
                        </div>
                    ) : <></>
                }
                <div className="col-span-1">
                    <NavItem title="Home" link="/" selected={selectedNavItem === 'home'} onclick={(e) => navclick(e, 'home')} />
                </div>
                <div className="col-span-1">
                    <NavItem title="Men" link="/collections/men" selected={selectedNavItem === 'men'} onclick={(e) => navclick(e, 'men')} />
                </div>
                <div className="col-span-1">
                    <NavItem title="Women" link="/collections/women" selected={selectedNavItem === "women"} onclick={(e) => navclick(e, 'women')} />
                </div>
                <div className="col-span-1">
                    <NavItem title="Kids" link="/collections/kids" selected={selectedNavItem === "kids"} onclick={(e) => navclick(e, 'kids')} />
                </div>
            </div>


            {/*  login */}
            <div className="flex flex-row items-center gap-4">

                {
                    localStorage.getItem('token') ? (
                        <a href="/logout" className="text-xl pl-6 pr-6 pt-2 pb-2 border-2 border-black rounded-full cursor-pointer " onClick={() => { localStorage.clear(); window.location.href = '/'; }} >
                            Logout
                        </a>
                    ) : (
                        <div>
                            <a href="/login" className="text-xl pl-6 pr-6 pt-2 pb-2 border-2 border-black rounded-full cursor-pointer">
                                Login
                            </a>
                            <a href="/user/signup" className="text-xl pl-6 pr-6 pt-2 pb-2 border-2 border-black rounded-full cursor-pointer">
                                Signup
                            </a>
                        </div>
                    )

                }


                <div >

                    {/* <img  src={CartIcon} alt="icon" className="w-8 h-8" />
                        <div className="absolute bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center">
                            0
                        </div> */}

                    <div className="relative w-8 h-8 cursor-pointer" onClick={() => window.location.href = '/cart'}>
                        {

                            cart &&

                            <div className="absolute bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center -top-1 -right-1">
                                {/* length of cart products */}

                                {cart.products.length}

                            </div>
                        }
                        <img src={CartIcon} alt="icon" className="w-8 h-8 bottom-0 left-0" />

                    </div>

                </div>

                <div className="flex flex-row items-center ">

                    <div className="text-xl">

                        {
                            localStorage.getItem('user') ?
                                // <a href="/profile" className="text-xl pl-6 pr-6 pt-2 pb-2  cursor-pointer">
                                <Avatar name={JSON.parse(localStorage.getItem('user')).name} />

                                // </a>
                                :

                                localStorage.getItem('admin') ?
                                    // <a href="/profile" className="text-xl pl-6 pr-6 pt-2 pb-2 cursor-pointer">
                                    <Avatar name="Admin" />
                                    // </a>
                                    :
                                    <></>


                        }

                    </div>

                    {/* my orders */}

                    <div className="pl-2 relative">
                        <div className='flex flex-row items-center ' onClick={() => window.location.href = '/myorders'}>

                            <div className="text-xl pl-6 pr-6 pt-2 pb-2 cursor-pointer bg-purple-500 text-white rounded-full">
                                My Orders
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div >
    )
}

export default NavBar;
