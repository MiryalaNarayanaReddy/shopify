import Logo from '../assets/icons/logo_big.png'
import CartIcon from '../assets/icons/cart_icon.png'
import { useEffect, useState } from 'react';

function NavItem({ title, link, selected , onclick}) {
    return (
        <div className="text-xl" >

            <a href={link} className={` ${selected ? 'border-b-2 border-red-600' : ''}`} onClick={onclick}>
                {title}
            </a>
        </div>

    )
}


function NavBar() {

    const [cartItems, setCartItems] = useState(null);
    const [selectedNavItem, setSelectedNavItem] = useState('Shop'); // Shop, Men, Women, Kids

    console.log(selectedNavItem);

    useEffect(() => {

       setCartItems(
            {
                products: [
                    {
                        id: 1,
                        name: 'Product 1',
                        price: 100,
                        quantity: 1
                    },
                    {
                        id: 2,
                        name: 'Product 2',
                        price: 200,
                        quantity: 1
                    },
                    {
                        id: 3,
                        name: 'Product 3',
                        price: 300,
                        quantity: 1
                    },
                ]
            }
        )
    }, []);
      
        
    const navclick = (e, title) => {
    console.log(selectedNavItem);

        e.preventDefault();
        setSelectedNavItem(title);
    }


    return (
        <div className="flex flex-row justify-around bg-white shadow-lg fixed top-0 w-full z-10 h-16 items-center">

            {/*  website name */}
            <div className="flex flex-row items-center gap-2 cursor-pointer" onClick={(e) => navclick(e, 'Shop')} >
                <div>
                    <img src={Logo} alt="icon" className="w-10 h-10" />
                </div>

                <div className="text-2xl font-bold" >
                    SHOPIFY
                </div>

            </div>

            {/* items */}

            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <NavItem title="Shop" link="#" selected={selectedNavItem === 'Shop'} onclick={(e) => navclick(e, 'Shop')} />
                </div>
                <div className="col-span-1">
                    <NavItem title="Men" link="#" selected={selectedNavItem === 'Men'} onclick={ (e) => navclick(e,'Men') } />
                </div>
                <div className="col-span-1">
                    <NavItem title="Women" link="#" selected={selectedNavItem === "Women"} onclick={(e) => navclick(e,'Women') } />
                </div>
                <div className="col-span-1">
                    <NavItem title="Kids" link="#" selected={selectedNavItem === "Kids"} onclick={(e) => navclick(e,'Kids') } />
                </div>
            </div>


            {/*  login */}
            <div className="flex flex-row items-center gap-4">
                <div className=" pl-6 pr-6 pt-2 pb-2 border-2 border-black rounded-full cursor-pointer">
                    Login
                </div>
                <div >

                    {/* <img  src={CartIcon} alt="icon" className="w-8 h-8" />
                        <div className="absolute bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center">
                            0
                        </div> */}

                    <div className="relative w-8 h-8 cursor-pointer">
                        {

                            cartItems && cartItems.products.length > 0 &&


                            <div className="absolute bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center -top-1 -right-1">
                                {cartItems.products.length}
                            </div>
                        }
                        <img src={CartIcon} alt="icon" className="w-8 h-8 bottom-0 left-0" />

                    </div>



                </div>
            </div>
        </div>
    )
}

export default NavBar;
