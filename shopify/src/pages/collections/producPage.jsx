import React, { useEffect } from 'react'
import axios from 'axios'
import { base_image_url, base_url } from '../../helper'

function ProductPage({ product ,cart, setCart, setSelectedProduct }) {

    // React.useEffect(() => {
    //     axios.get('https://fakestoreapi.com/products')
    //         .then(res => {
    //             setProducts(res.data)
    //         })
    // }, [])

    const [quantity, setQuantity] = React.useState(1);

    const addTocart = () => {
        // console.log('added to cart')

        if(localStorage.getItem('token') === null){
            window.location.href = '/login';
        }

        axios.post(`${base_url}/cart/add`, {
            product_name: product.name,
            product_id: product._id,
            quantity: quantity,
            price_per_unit: product.new_price
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then
            ((res) => {
                if(res.status === 201){
                 
                    setCart(res.data)
                    localStorage.setItem('cart', JSON.stringify(res.data))

                    alert('Added to cart');
                }
                else{
                    alert('Failed to add to cart');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const [selectedImage, setSelectedImage] = React.useState(0);


    useEffect(() => {
        console.log(selectedImage) // this will print the index of the selected image
    }, [selectedImage]);

    return (
        <div className=" mt-16">

            <div className="grid grid-cols-1 justify-left mt-2 items-center w-40" onClick={() => setSelectedProduct(null)}>
                <button className="bg-orange-200 text-black p-2 mrounded-full hover:bg-orange-400 cursor-pointer border-4  shadow-lg transform delay-100 border-orange-500">
                    Back
                </button>
            </div>

    
        <div className="grid grid-cols-12 justify-center items-center bg-white rounded-lg p-4   shadow-lg h-[90vh] ">
            {/* back button */}


            <div className='cols-span-4 grid-cols-1  overflow-y-auto h-[70vh]'>
                {
                    product.images.map((image, indx) => { // indx is the index of the image
                        return <img src={`data:${image.contentType};base64,${image.data}`} alt={product.name}
                            // className={`col-span-1 p-4 border-2 border-gray-200  ${product.image_ids.indexOf(image_id) === selectedImage ? 'border-blue-500' : ''} `}
                            className={`col-span-1 p-4 border-2 border-gray-200 ${indx === selectedImage ? 'border-red-500' : ''}`}
                            onClick={() => { setSelectedImage(indx) }} />
                    })
                }
            </div>
            {/* height n times 20 */}
            <div className='col-span-4 grid-cols-1 justify-center items-center bg-white rounded-lg p-4 m-4 shadow-lg justify-self-center'>
                {/* <img src={base_image_url + '/' + product.image_ids[selectedImage]} alt={product.name} className='col-span-1  p-4 border-2 border-gray-200 w-[70vh]' /> */}

                {/* <img src={`data:image/png;base64,${product.img.data}`} /> */}
                <img src={`data:${product.images[selectedImage].contentType};base64,${product.images[selectedImage].data}`} alt={product.name} className='col-span-1  p-4 border-2 border-gray-200 w-[70vh]' />

            </div>

            <div className='col-span-4 grid-cols-1 justify-center items-center bg-white rounded-lg p-4 m-4 shadow-lg '>
                <div className='col-span-1 text-6xl font-bold'>
                    {product.name}
                </div>

                <div col-span-1 >

                    <div className='flex flex-row p-2 m-2 justify-left items-center'>

                        <div className='text-4xl font-bold text-red-500 pr-4'>
                            Rs {product.new_price}
                        </div>
                        <div className='line-through text-2xl pr-4  text-gray-500'>
                           Rs {product.old_price}
                        </div>

                        <div className='text-2xl font-bold text-green-500 '>
                            {Math.floor(((product.old_price - product.new_price) / product.old_price) * 100)}% off
                        </div>

                       

                    </div>
                    <div className='col-span-1 p-2 m-2'>
                        <p className='text-xl text-gray-500 font-bold'>Rating:</p>
                    </div>

                </div>


                <div className='col-span-1 p-2 m-2'>
                    <p className='text-xl font-bold'>Description:</p>
                    <p>{product.description}</p>
                </div>

                <div className='col-span-1 p-2 m-2'>
                    <p className='text-xl font-bold'>Category:</p>
                    <p>{product.category}</p>

                </div>

                <div className='col-span-1 p-2 m-2'>
                    <p className='text-xl font-bold'>Quantity:</p>
                    <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)} className='border-2 border-gray-200 p-2 m-2 w-20' />
                </div>

                <button className='col-span-1 bg-blue-500 text-white rounded-lg p-2 m-2 cursor-pointer hover:bg-green-500'
                onClick={addTocart}>
                    Add to Cart
                </button>
            </div>
        </div>
        </div>
    )
}

export default ProductPage;