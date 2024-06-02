import { base_image_url } from "../helper";
// import { Buffer } from 'buffer';

// const arrayBufferToBase64 = (buffer) => {
//     let binary = '';
//     const bytes = new Uint8Array(buffer);
//     const len = bytes.byteLength;
//     for (let i = 0; i < len; i++) {
//         binary += String.fromCharCode(bytes[i]);
//     }
//     return window.btoa(binary);
// };



export function ItemCard({ item ,onClick }) {
    // console.log(item.images[0].data);
    // const base64String = Buffer.from(item.images[0].data).toString('base64');

    // const base64String = arrayBufferToBase64(item.images[0].data);
    return (
        <div className="grid grid-cols-1 justify-space-around items-center bg-white rounded-lg p-4 m-4 shadow-lg " onClick={onClick}>
            <div className="col-span-1">
          
                <img
                src={`data:${item.images[0].contentType};base64,${item.images[0].data}`}
                //  src={`data:${item.images[0].contentType};base64,${base64String}`}
                alt={item.name} className="w-full h-50 object-cover" />
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


