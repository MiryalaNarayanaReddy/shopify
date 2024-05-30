
import { ItemCard } from "../../components/ItemCards";

import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../helper";
import {sample_data} from '../collections/sample_data'

export default function ViewProduct() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // axios.get(base_url + 'product')
        // .then((res) => {
        //     setProducts(res.data.data);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

       

       setProducts(sample_data);

        setLoading(false);

    }
        , []);  

    return (
        <div className="col-span-6 xl:col-span-11 justify-center items-center flex flex-col">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
                    {loading ? (
                        <h1>Loading...</h1>
                    ) : (
                        products.map((product) => (
                            <ItemCard key={product.id} item={product} />
                        ))
                    )}
                </div>

            </div>

    )
}
