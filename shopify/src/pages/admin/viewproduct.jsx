
import { ItemCard } from "../../components/ItemCards";
import { ItemSkeleton } from "../../components/ItemCards";

import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../helper";
import { sample_data } from '../collections/sample_data'
import ProductPage from '../collections/producPage'

export default function ViewProduct() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        //    axios.get(base_url + '/products/all',
        //         {
        //             headers: {
        //                 'Authorization': 'Bearer ' + localStorage.getItem('token')
        //             }
        //         }
        //     )
        fetch(base_url + '/products/all',
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })


        //    setProducts(sample_data);

        setLoading(false);

    }
        , []);

    return (

        selectedProduct ? <ProductPage product={selectedProduct} /> 
    : 

        <div className="col-span-6 xl:col-span-11 justify-center items-center flex flex-col">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
                {loading ? (
                    <ItemSkeleton cardCount={8} />
                ) : (
                    products.map((product) => (
                        <ItemCard key={product.id} item={product} onClick={() => setSelectedProduct(product)} />
                    ))
                )}
            </div>
        </div>
    )
}
