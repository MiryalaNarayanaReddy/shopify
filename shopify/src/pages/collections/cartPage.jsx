import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { base_url } from "../../helper";
import { parse } from "postcss";



function CartItem({ cartItem }) {

    const deleteFromCart = () => {
        axios.delete(`${base_url}/cart/delete/${cartItem._id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (

        <tr>
            <td className=" p-2 text-xl font-bold">{cartItem.product_name}</td>
            <td className=" p-2 text-red-500 font-bold">${cartItem.price_per_unit}</td>
            <td className=" p-2 text-lg">{cartItem.quantity}</td>
            <td className=" p-2 text-lg"> ${cartItem.price_per_unit * cartItem.quantity}</td>
            <td className=" p-2 text-lg cursor-pointer" onClick={deleteFromCart}>Delete</td>
        </tr>

    )
}

function CartPage(){

    const [cartItems, setCartItems] = useState(null);
    const [total, setTotal] = useState(0);
    const [totalprice, setTotalPrice] = useState(0);


    const removeCart = () => {
        axios.delete(`${base_url}/cart/clear`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data);
            }
            )
            .catch((err) => {
                console.log(err);
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
                console.log(res.data.products);
                setCartItems(res.data.products); // array of cart items

                // set total price

                let tp = 0;
                
                for (let i = 0; i < res.data.products.length; i++) {
                  tp = tp + parseInt(res.data.products[i].price_per_unit) * parseInt(res.data.products[i].quantity);
                }

                // set total quantity

                let t = 0;

                for (let i = 0; i < res.data.products.length; i++) {
                    t = t + parseInt(res.data.products[i].quantity);
                }

                setTotal(t);
                setTotalPrice(tp);
            })
            .catch((err) => {
                console.log(err);
            })

    }, []);

    return (

        <div className="flex flex-col justify-self-center items-center mt-16 bg-white rounded-lg p-4 m-4  shadow-lg ">





            {/* <div className="flex flex-row justify-between items-center border-b-2 border-gray-200 p-2 m-2">
                    <div className="text-xl font-bold">Product</div>
                    <div className="text-xl font-bold">Price</div>
                    <div className="text-xl font-bold">Quantity</div>
                    <div className="text-xl font-bold">Total</div>
                    <div className="text-xl font-bold">Action</div>
                </div> */}

            <tb className="justify-self-center">
                <tr >
                    <th className="text-xl p-2 font-bold">Product</th>
                    <th className="text-xl p-2 font-bold">Price</th>
                    <th className="text-xl p-2 font-bold">Quantity</th>
                    <th className="text-xl p-2 font-bold">Total</th>
                    <th className="text-xl p-2 font-bold">Action</th>
                </tr>

                {
                    cartItems === null ? (<div>Loading...</div>) : (
                        // array of cart items
                        cartItems.map((cartItem) => {
                            return <CartItem cartItem={cartItem} />
                        })
                    )
                }

                {/*  total */}

                <tr>
                    <td className=" p-2 text-xl font-bold">Total</td>
                    <td className=" p-2 text-red-500 font-bold"> </td>
                    <td className=" p-2 text-lg"> {total}</td>
                    <td className=" p-2 text-lg"> $ {totalprice}</td>
                    <td className=" p-2 text-lg"> <button className="bg-red-500 text-white p-2 rounded-lg" onClick={removeCart}>Clear Cart</button></td>
                </tr>

            </tb>

            {/* buy button */}
            <div className="flex flex-row justify-center items-center mt-4">
                <button className="bg-green-500 text-white p-2 rounded-lg">Order</button>
            </div>

        </div>

    )


}

export default CartPage;