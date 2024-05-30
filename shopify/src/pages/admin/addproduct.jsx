import React, { useState } from 'react';
import { base_url } from '../../helper';

function InputCard({ label, type, value, setValue }) {
    return (
        <div className='col-span-1'>
            <label className='text-lg font-bold'>
                {label}
            </label>
            <input type={type} value={value} onChange={(e) => setValue(e.target.value)} className='w-full p-2 border-2 border-gray-300 rounded-lg' />
        </div>
    )
}

function AddProductPage() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState(''); // men,women,kids
    const [old_price, setOldPrice] = useState('');
    const [new_price, setNewPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const addProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);

        formData.append('old_price', old_price);
        formData.append('new_price', new_price);
        formData.append('description', description);

        for (let i = 0; i < images.length; i++) {
            formData.append('productImages', images[i]);
        }

        fetch(base_url + '/products/add', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
                // 'Content-Type' is not needed here because the browser will automatically set it to multipart/form-data
            },
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {
                alert('Product Added Successfully');
                window.location.href = '/admin/dashboard';
             
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="grid grid-cols-1 items-center justify-center">
            <h1 className="text-2xl font-bold">Add Product</h1>

            <form className="col-span-1 gap-4" onSubmit={addProduct}>
                <InputCard label='Name' type='text' value={name} setValue={setName} />

                <label className='text-lg font-bold'>Category</label>
                <select className='w-full p-2 border-2 bg-white rounded-lg' value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value=''>Select Category</option>
                    <option value='men'> men</option>
                    <option value='women'> women</option>
                    <option value='kids'> kids</option>
                </select>


                <InputCard label='Old Price' type='number' value={old_price} setValue={setOldPrice} />
                <InputCard label='New Price' type='number' value={new_price} setValue={setNewPrice} />
                <InputCard label='Description' type='text' value={description} setValue={setDescription} />

                <div className='col-span-1'>
                    <label className='text-lg font-bold'>Product Images</label>
                    <input type='file' multiple className='w-full p-2 border-2 border-gray-300 rounded-lg' onChange={handleFileChange} />
                </div>

                <div className='col-span-1 mt-4'>
                    <button type='submit' className='bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700'>
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProductPage;
