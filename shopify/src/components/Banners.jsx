import HeroImage from "../assets/banner images/hero_image.png"
import ExclusiveImage from "../assets/banner images/exclusive_image.png"
import HandWave from "../assets/icons/hand_icon.png"

import Instagram from "../assets/icons/instagram_icon.png"
import Pintester from "../assets/icons/pintester_icon.png"
import WhatsApp from "../assets/icons/whatsapp_icon.png"
import Logo from "../assets/icons/logo.png"

import { new_collections } from "../pages/collections/sample_data"
import { data_product } from "../pages/collections/sample_data"

import { ItemCard } from "../components/ItemCards"

export function HeroBanner() {

    return (

        <div className=" flex flex-row items-center bg-gradient-to-b from-pink-200 to-white justify-around">

            <div className="col-span-1 grid grid-cols-1 justify-center items-center ml-4">

                <div className="text-md col-span-1 md:text-xl">
                    NEW ARRIVALS ONLY
                </div>
                <div className="text-4xl  col-span-1 grid grid-cols-2 md:text-8xl">
                    <div className="col-span-1">
                        new </div>
                    <div className="col-span-1">

                        <img src={HandWave} alt="wave" className="w-16 h-16" />
                    </div>
                </div>

                <div className="text-4xl col-span-1  md:text-8xl">
                    Collections
                </div>

                <div className="text-4xl col-span-1  md:text-8xl">
                    for everyone
                </div>
            </div>
            <div className="col-span-1 grid grid-cols-1 justify-center items-center">
                <img src={HeroImage} alt="hero" />
            </div>
        </div>
    )
}

export function PopularContent({ Category }) {

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

                {data_product.map((product) => (
                    <ItemCard key={product.id} item={product} />
                ))}


            </div>

        </div >

    )
}

export function ExclusiveOfferBanner() {

    return (

        <div className="grid grid-cols-2 justify-around items-center bg-gradient-to-b from-pink-200 to-white m-auto">

            <div className="col-span-1 grid grid-cols-1 justify-center items-center ml-4">

                <div className="text-xl col-span-1 md:text-6xl">
                    Exclusive
                </div>

                <div className="text-xl col-span-1  md:text-6xl">

                    Offers For You
                </div>

                <div className="text-md col-span-1  md:text-2xl mt-8">
                    ONLY ON BEST SELLERS PRODUCTS
                </div>

                <a href="/products" className="text-xl col-span-1  md:text-2xl  text-white pl-4 pr-4 rounded-full bg-red-500 w-fit">
                    Check now
                </a>

            </div>

            <div className="col-span-1 grid grid-cols-1 justify-center items-center">
                <img src={ExclusiveImage} alt="hero" />
            </div>

        </div >

    )
}

export function NewContent() {



    return (

        <div className="grid grid-cols-1 justify-center items-center ">


            <div className="text-4xl col-span-1 text-center mb-4">

                NEW COLLECTIONS
                <div className=" col-span-1 p-1">
                    <div className="bg-black h-2 w-1/6 m-auto"></div>
                </div>
            </div>

            {/*  new items in this category */}

            <div className="grid grid-cols-4 col-span-1 justify-self-center items-center">

               
                {new_collections.map((product) => (
                    <ItemCard key={product.id} item={product} />
                ))}


            </div>

        </div >

    )
}

export function GetExclusiveOfferOnYourEmail() {
    return (

        <div className="grid grid-cols-1 justify-center items-center bg-gradient-to-b from-pink-200 to-white w-full h-full">

            <div className="col-span-1 text-6xl text-center p-4 mt-4">
                Get Exclusive Offers On Your Email
            </div>

            <div className="col-span-1 text-xl text-center ">
                Subscribe to our newsletter and stay updated.
            </div>

            <div className="col-span-1 text-2xl text-center p-4 w-1/2 m-auto">

                <form className="border-2 border-black rounded-full flex flex-row justify-center items-center relative">

                    <input type="email" placeholder="Your email id" className="col-span-1 text-2xl text-center p-2 rounded-full w-full border-2 border-black-400 absolute left-0" />
                    <button className="col-span-1 text-2xl text-center p-2 pl-4 pr-4 rounded-full  bg-black text-white border-2 border-black-400 absolute right-0">
                        Subscribe
                    </button>
                </form>
            </div>

        </div>
    )
}

export function Footer() {
    return (
        <div className="grid grid-cols-1 justify-around items-center mb-4"  >


            <div className="col-span-1 text-2xl text-center p-4 mt-4">
                <div className="flex flex-row items-center justify-center gap-2 cursor-pointer" >
                    <div>
                        <img src={Logo} alt="icon" className="w-20 h-20" />
                    </div>

                    <div className="text-4xl font-bold" >
                        SHOPIFY
                    </div>

                </div>

            </div>

            <div className="col-span-1 text-2xl flex flex-row justify-center items-center gap-4 mt-4">
                <div className="text-sm" >
                    Company
                </div>
                <div className="text-sm" >
                    Products
                </div>
                <div className="text-sm" >
                    Offices
                </div>
                <div className="text-sm" >
                    About
                </div>
                <div className="text-sm" >
                    Contact
                </div>
            </div>

            <div className="col-span-1 text-2xl flex flex-row justify-center items-center gap-4 mt-4">
                <div >
                    <img src={Instagram} alt="icon" className="w-8 h-8" />
                </div>
                <div >
                    <img src={Pintester} alt="icon" className="w-8 h-8" />
                </div>
                <div >
                    <img src={WhatsApp} alt="icon" className="w-8 h-8" />
                </div>

            </div>

        </div>
    )
}

