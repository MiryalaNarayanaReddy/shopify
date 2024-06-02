import { useEffect } from "react";
import { ItemCard, ItemSkeleton } from "../../components/ItemCards";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom'

import axios from "axios";
import { base_url } from "../../helper";

import { sample_data } from "../collections/sample_data"
import { Banner } from "../../components/CollectionBanners";
import banner_image_men from "../../assets/banner images/banner_mens.png"
import banner_image_women from "../../assets/banner images/banner_women.png"
import banner_image_kids from "../../assets/banner images/banner_kids.png"

import ProductPage from "../collections/producPage";

function Home({cart,setCart}) {

    const [products, setProducts] = useState([]);
    // const [banner_image, setBannerImage] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);

    // get all products from the category

    useEffect(() => {

        const category = localStorage.getItem('category');

        axios.get(`${base_url}/products/all`)

            .then((res) => {
                console.log(res.data);
                setProducts(res.data);

                // // add delay to simulate loading
                // setTimeout(() => {
                //     setLoading(false);
                // }, 2000);

                setLoading(false);
            })
            .catch((err) => {
                alert("Error fetching products");
                console.log(err);
                setLoading(false);
            });

    }, []);

    useEffect(() => {
        console.log(products);
    }, [selectedProduct]);


    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    }


    // display all products in the category 

    return (

        selectedProduct !== null ?
            <ProductPage product={selectedProduct} cart={cart} setCart={setCart} />

            :
            (
                <div className="grid grid-cols-1 justify-center items-center mt-16" >
                    {/* <Banner banner_image={banner_image} /> */}

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

export default Home;