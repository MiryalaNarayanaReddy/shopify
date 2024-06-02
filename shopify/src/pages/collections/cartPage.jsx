import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { base_url } from "../../helper";
import { parse } from "postcss";



function CartItem({ cartItem, setCart, cart }) {

    const deleteFromCart = ({ product_id }) => {
        axios.post(`${base_url}/cart/remove`, {

            product_id

        }, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
            .then((res) => {

                if (res.status === 200) {
                    
                    window.location.reload();
                }
                else {
                    alert('Failed to delete item from cart');
                }
            })

            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <tr>
            <td >

                <img src={`data:${cartItem.contentType};base64,${cartItem.image}`} alt={cartItem.product_name} className=' h-20 p-2' />
            </td>

            <td className=" p-2 text-xl font-bold flex flex-row items-center justify-center">

                {/* <div className="flex flex-row items-center"> */}

                {/* <img src={`data:${product.images[selectedImage].contentType};base64,${product.images[selectedImage].data}`} alt={product.name} className='col-span-1  p-4 border-2 border-gray-200 w-[70vh]' /> */}

                {/* </div> */}
                <div className="text-lg font-bold ">{cartItem.product_name}</div>

            </td>
            <td className=" p-2 text-red-500 font-bold">${cartItem.price_per_unit}</td>
            <td className=" p-2 text-lg">{cartItem.quantity}</td>
            <td className=" p-2 text-lg"> ${cartItem.price_per_unit * cartItem.quantity}</td>
            <td className=" p-2 text-lg cursor-pointer" onClick={() => { deleteFromCart({ product_id: cartItem.product_id }) }}>Delete</td>
        </tr>

    )
}

function CartPage({ cart, setCart }) {


    const [total, setTotal] = useState(0);
    const [totalprice, setTotalPrice] = useState(0);


    const removeCart = () => {
        axios.delete(`${base_url}/cart/clear`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                // console.log(res.data);

                setCart({ products: [] });
                localStorage.setItem('cart', JSON.stringify({ products: [] }));

                alert('Cart Cleared');


            }
            )
            .catch((err) => {
                console.log(err);
                alert('Failed to clear cart');
            }
            )
    }



    useEffect(() => {
        axios.get(`${base_url}/cart/`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {

                if (res.status === 200) {

                    console.log(res.data);
                    setCart(res.data);
                    localStorage.setItem('cart', JSON.stringify(res.data));

                    const cartItems = res.data.products;

                    if (cartItems.length > 0) {
                        // set total price

                        let tp = 0;

                        for (let i = 0; i < cartItems.length; i++) {
                            tp = tp + parseInt(cartItems[i].price_per_unit) * parseInt(cartItems[i].quantity);
                        }

                        // set total quantity

                        let t = 0;

                        for (let i = 0; i < cartItems.length; i++) {
                            t = t + parseInt(cartItems[i].quantity);
                        }

                        setTotal(t);
                        setTotalPrice(tp);
                    }
                }
                else {
                    setCart({ products: [] });
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }, []);


    const handleOrder = () => {
        axios.post(`${base_url}/cart/order`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                if(res.status === 200)
                    {
                        alert('Order Placed');
                        window.location = '/myorders';
                    }
                else
                    {
                        alert('Failed to place order');
                    }
            })
            .catch((err) => {
                console.log(err);
                alert('Failed to place order');
            })
        }   

    return (

        cart.products.length === 0 ? (
            <div className="grid grid-cols-1 justify-center items-center mt-16 bg-white rounded-lg p-4 m-4  shadow-lg h-[50vh] ">

                <div className="text-2xl font-bold  text-center">Cart is Empty</div>
            </div>
        ) : (
            <div className="flex flex-col justify-self-center items-center mt-16 bg-white rounded-lg p-4 m-4  shadow-lg ">



                {/* <div className="flex flex-row justify-between items-center border-b-2 border-gray-200 p-2 m-2">
                    <div className="text-xl font-bold">Product</div>
                    <div className="text-xl font-bold">Price</div>
                    <div className="text-xl font-bold">Quantity</div>
                    <div className="text-xl font-bold">Total</div>
                    <div className="text-xl font-bold">Action</div>
                </div> */}

                <table className="table-auto ">

                    <thead>
                        <tr >
                            <th className="text-xl p-2 font-bold">Image</th>
                            <th className="text-xl p-2 font-bold">Product</th>
                            <th className="text-xl p-2 font-bold">Price</th>
                            <th className="text-xl p-2 font-bold">Quantity</th>
                            <th className="text-xl p-2 font-bold">Total</th>
                            <th className="text-xl p-2 font-bold">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-lg">


                        {
                            // array of cart items
                            cart.products.map((cartItem) => {
                                return <CartItem cartItem={cartItem} setCart={setCart} cart={cart} />
                            })
                        }


                        {/*  total */}

                        <tr>
                            <td className=" p-2 text-xl font-bold"></td>
                            <td className=" p-2 text-xl font-bold">Total</td>

                            <td className=" p-2 text-red-500 font-bold"> </td>
                            <td className=" p-2 text-lg"> {total}</td>
                            <td className=" p-2 text-lg"> $ {totalprice}</td>
                            <td className=" p-2 text-lg"> <button className="bg-red-500 text-white text-sm p-2 rounded-lg hover:bg-red-600" onClick={removeCart}>Clear Cart</button></td>
                        </tr>

                    </tbody>

                </table>

                {/* buy button */}
                <div className="flex flex-row justify-center items-center mt-4">
                    <button className="bg-green-500 text-white p-2 rounded-lg" onClick={handleOrder}>Place Order</button>
                </div>

            </div>


        )

    )
}

export default CartPage;