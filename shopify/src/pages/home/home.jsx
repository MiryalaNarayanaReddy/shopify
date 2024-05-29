
import HeroImage from "../../assets/banner images/hero_image.png"
import HandWave from "../../assets/icons/hand_icon.png"

import product1 from "../../assets/women/product_1.png"
import product2 from "../../assets/women/product_2.png"
import product3 from "../../assets/women/product_3.png"
import product4 from "../../assets/women/product_4.png"


function HeroBanner() {

    return (

        <div className=" flex flex-row justify-around items-center bg-gradient-to-b from-pink-200 to-white">

            <div className="col-span-1 grid grid-cols-1 justify-center items-center">

                <div className="text-xl col-span-1">
                    NEW ARRIVALS ONLY
                </div>
                <div className="text-8xl  col-span-1 grid grid-cols-2">
                    <div className="col-span-1">
                        new </div>
                    <div className="col-span-1">

                        <img src={HandWave} alt="wave" className="w-16 h-16" />
                    </div>

                </div>

                <div className="text-8xl col-span-1">
                    Collections
                </div>

                <div className="text-8xl  col-span-1">
                    for everyone
                </div>

            </div>

            <div className="col-span-1 grid grid-cols-1 justify-center items-center">
                <img src={HeroImage} alt="hero" />
            </div>
        </div>
    )
}


function ItemCard({ item }) {

    return (
        <div className="grid grid-cols-1 justify-space-around items-center bg-white rounded-lg p-4 m-4 shadow-lg">
            <div className="col-span-1">
                <img src={item.image} alt="item" />
            </div>
            <div className="col-span-1">
                {item.name}
            </div>
            <div className="col-span-1">
                {item.price}
            </div>
        </div>
    )
}


function PopularContent({ Category }) {

    return (

        <div className="grid grid-cols-1 justify-center items-center ">


            <div className="text-4xl col-span-1 text-center mb-4">

                POPULAR IN {Category}
                <div className=" col-span-1 p-1">
                    <div className="bg-black h-2 w-1/6 m-auto"></div>
                </div>
            </div>

            {/*  new items in this category */}

            <div className="grid grid-cols-4 col-span-1 justify-self-center items-center">
               
                <ItemCard item={{ name: "Product 1", price: 100, image: product1 }} />
                <ItemCard item={{ name: "Product 2", price: 200, image: product2 }} />
                <ItemCard item={{ name: "Product 3", price: 300, image: product3 }} />
                <ItemCard item={{ name: "Product 4", price: 400, image: product4 }} />

            </div>


           
        </div >

    )
}

function Home() {
    return (

        <div className="flex flex-col items-center justify-center overflow-y-auto mt-16 ">

            <div className="w-full h-screen">

                <HeroBanner />
            </div>

            <div className="w-full h-screen">

                <PopularContent Category="WOMEN" />
            </div>

        </div >
    );
}

export default Home;