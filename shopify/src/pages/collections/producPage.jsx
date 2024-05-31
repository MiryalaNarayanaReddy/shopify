import React from 'react'
import axios from 'axios'
import { base_image_url, base_url } from '../../helper'

function ProductPage({ product }) {

    // React.useEffect(() => {
    //     axios.get('https://fakestoreapi.com/products')
    //         .then(res => {
    //             setProducts(res.data)
    //         })
    // }, [])

    const [quantity, setQuantity] = React.useState(1);

    const addTocart = () => {
        // console.log('added to cart')
        axios.post(`${base_url}/cart/add`, {
            product_name: product.name,
            product_id: product._id,
            quantity: quantity,
            price_per_unit: product.new_price
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
    }

    const [selectedImage, setSelectedImage] = React.useState(0)

    return (
        <div className="grid grid-cols-12 justify-center items-center mt-16 bg-white rounded-lg p-4 m-4  shadow-lg h-[90vh] ">

            <div className='cols-span-4 grid-cols-1  overflow-y-auto h-[70vh]'>
                {
                    product.image_ids.map((image_id) => {
                        return <img src={base_image_url + '/' + image_id} alt={product.name}
                            className={`col-span-1 p-4 border-2 border-gray-200  ${product.image_ids.indexOf(image_id) === selectedImage ? 'border-blue-500' : ''} `}
                            onClick={() => { setSelectedImage(product.image_ids.indexOf(image_id)) }} />
                    })
                }
            </div>
            {/* height n times 20 */}
            <div className='col-span-4 grid-cols-1 justify-center items-center bg-white rounded-lg p-4 m-4 shadow-lg justify-self-center'>
                <img src={base_image_url + '/' + product.image_ids[selectedImage]} alt={product.name} className='col-span-1  p-4 border-2 border-gray-200 w-[70vh]' />

            </div>

            <div className='col-span-4 grid-cols-1 justify-center items-center bg-white rounded-lg p-4 m-4 shadow-lg '>
                <div className='col-span-1 text-6xl font-bold'>
                    {product.name}
                </div>

                <div col-span-1 >

                    <div className='flex flex-row p-2 m-2 justify-left items-center'>

                        <div className='text-4xl font-bold text-red-500 pr-4'>
                            $ {product.new_price}
                        </div>
                        <div className='line-through text-2xl pr-4  text-gray-500'>
                            $ {product.old_price}
                        </div>

                        <div className='text-2xl font-bold text-green-500 '>
                            {Math.floor(((product.old_price - product.new_price) / product.old_price) * 100)}% off
                        </div>

                        <div className='text-2xl font-bold text-green-500 '>
                            {/* buy now buttom */}
                            <button className='bg-blue-500 text-white rounded-lg p-2 m-2'>
                                Buy Now
                            </button>
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
                    <input type='number' value={quantity} onChange={(e) => setQuantity(e.target.value)}  className='border-2 border-gray-200 p-2 m-2 w-20' />
                </div>

                <button className='col-span-1 bg-blue-500 text-white rounded-lg p-2 m-2' onClick={addTocart}>
                    Add to Cart
                </button>
            </div>
        </div>

    )
}

export default ProductPage;