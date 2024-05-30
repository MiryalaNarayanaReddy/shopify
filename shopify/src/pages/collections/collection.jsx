import { useEffect } from "react";
import { ItemCard } from "../../components/ItemCards";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom'


import { sample_data } from "./sample_data";
import { Banner } from "../../components/CollectionBanners";
import banner_image_men from "../../assets/banner images/banner_mens.png"
import banner_image_women from "../../assets/banner images/banner_women.png"
import banner_image_kids from "../../assets/banner images/banner_kids.png"


function CollectionPage() {

    const [products, setProducts] = useState([]);
    const [banner_image, setBannerImage] = useState('');
    const [loading, setLoading] = useState(true);

    // get all products from the category

    useEffect(() => {

        const category = localStorage.getItem('category');

        // axios.get(`http://localhost:5000/products/category/${Category}`)
        //     .then((res) => {
        //         setProducts(res.data);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        for (let i = 0; i < sample_data.length; i++) {
            if (sample_data[i].category === category) {
                setProducts((prev) => [...prev, sample_data[i]]);
            }
        }

        if(category === "men"){
            setBannerImage(banner_image_men)
        }
        else if(category === "women"){
            setBannerImage(banner_image_women)
        }
        else{
            setBannerImage(banner_image_kids)
        }


        setLoading(false);

    }, []);

    // display all products in the category 

    return (

        <div className="grid grid-cols-1 justify-center items-center mt-16">
            <Banner banner_image={banner_image} />

            <div className="grid grid-cols-4 gap-4">
                {loading ? (
                    <h1>Loading...</h1>
                ) : (
                    products.map((product) => (
                        <ItemCard key={product.id} item={product} />
                    ))
                )}
            </div>

        </div>
    );
}

export default CollectionPage;