import { base_image_url } from "../helper";



export function ItemCard({ item ,onClick }) {

    return (
        <div className="grid grid-cols-1 justify-space-around items-center bg-white rounded-lg p-4 m-4 shadow-lg " onClick={onClick}>
            <div className="col-span-1">
                <img src={base_image_url+`/${item.image_ids[0]}`} alt={item.name}  />
            </div>
            <div className="col-span-1">
                {item.name}
            </div>

            <div className="col-span-1 text-xl font-bold">
                New Price: {item.new_price}
                </div>
            <div className="col-span-1">
                Old Price: {item.old_price}
                </div>
        </div>
    )
}


