import { PopularContent, HeroBanner, ExclusiveOfferBanner, NewContent, GetExclusiveOfferOnYourEmail, Footer } from "../../components/Banners"

function Home() {
    return (

        <div className="flex flex-col items-center justify-center ">

            <div className="w-full h-screen mt-16 ">
                <HeroBanner />
            </div>

            <div className="w-full h-screen mt-16 ">
                {/* <PopularContent Category="WOMEN" /> */}
            </div>

            <div className="w-4/6 mt-16">
                <ExclusiveOfferBanner />
            </div>

            <div className="w-full mt-16">
                {/* <NewContent Category={"KIDS"} /> */}
            </div>

            <div className="w-4/6 mt-16 h-[30vh]">
                <GetExclusiveOfferOnYourEmail />
                   
            </div>

            {/* <div className="w-full mt-16">
                <Footer />
            </div> */}

        </div >
    );
}

export default Home;