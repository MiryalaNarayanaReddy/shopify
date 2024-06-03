import { useEffect } from "react";
import { ItemCard } from "../../components/ItemCards";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom'

import axios from "axios";
import { base_url } from "../../helper";

import { sample_data } from "./sample_data";
import { Banner } from "../../components/CollectionBanners";
import banner_image_men from "../../assets/banner images/banner_mens.png"
import banner_image_women from "../../assets/banner images/banner_women.png"
import banner_image_kids from "../../assets/banner images/banner_kids.png"

import ProductPage from "./producPage";
import { ItemSkeleton } from "../../components/ItemCards";

import { openDB, getFromDB, putToDB } from "../indexDB";


function CollectionPage({ cart, setCart }) {

    const [products, setProducts] = useState([]);
    const [banner_image, setBannerImage] = useState('');
    const [loading, setLoading] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState(null);

    // get all products from the category


    useEffect(async () => {

        const category = localStorage.getItem('category');

        const db = await openDB('MyDatabase', 1);
        const timestamp = await getFromDB(db, 'products', 'timestamp');// get timestamp from indexedDB
        if (timestamp && Date.now() - timestamp.value < 1000 * 60 * 10) { // 10 minutes

            const data = await getFromDB(db, 'products', 'data'); // getdata

            const filteredData = data.value.filter((item) => item.category === category);

            if (data) {

                setProducts(filteredData);
                setLoading(false);

            }
        }
        else {



            setLoading(true);

            axios.get(`${base_url}/products/all`)
                .then(async (res) => {

                    const filteredData = res.data.filter((item) => item.category === category);

                    setProducts(filteredData);
                    setLoading(false);

                    // save data in local storage with time stamp

                    await putToDB(db, 'products', { id: 'timestamp', value: Date.now() });
                    await putToDB(db, 'products', { id: 'data', value: response.data });

                })
                .catch((err) => {
                    alert("Error fetching products");
                    console.log(err);
                    setLoading(false);
                });
        }

        if (category === "men") {
            setBannerImage(banner_image_men)
        }
        else if (category === "women") {
            setBannerImage(banner_image_women)
        }
        else {
            setBannerImage(banner_image_kids)
        }

    }, []);

    useEffect(() => {
        // console.log(products);
        if (selectedProduct !== null) {
            localStorage.setItem('selectedProduct', 1);

        }
        else {
            localStorage.setItem('selectedProduct', 0);
        }

    }, [selectedProduct]);


    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    }


    // display all products in the category 

    return (

        selectedProduct !== null ?
            <ProductPage product={selectedProduct} cart={cart} setCart={setCart} setSelectedProduct={setSelectedProduct} />

            :
            (
                <div className="grid grid-cols-1 justify-center items-center mt-16" >
                    <Banner banner_image={banner_image} />

                    <div className="grid grid-cols-4 gap-4">
                        {loading ? (

                            <ItemSkeleton cardCount={8} />

                        ) : (
                            products.map((product) => (
                                <ItemCard key={product.id} item={product} onClick={() => handleSelectProduct(product)} />
                            ))
                        )}
                    </div>

                </div>
            )



    );
}

export default CollectionPage;