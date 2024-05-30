
export function Banner({ banner_image }) {
    return (
        <div className="grid grid-cols-1 justify-around items-center bg-white rounded-lg p-4 m-4 shadow-lg">
            <div className="col-span-1">
                <img src={banner_image} alt="banner" />

            </div>

        </div>
    )
}