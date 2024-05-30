

export function AdminNavBar({ selectedNavItem, setSelectedNavItem }) {

    const navclick = (e, title) => {
        e.preventDefault();
        setSelectedNavItem(title);
    }



    return (
        <div className='grid grid-cols-1 items-center justify-center '>
            <a href="/admin/viewproduct"
                className="w-full p-4 text-center hover:bg-gray-300"
                onClick={(e) => navclick(e, 'viewproduct')}>
                View Products
            </a>
            <a href="/admin/addproduct"
                className="w-full text-center p-4  hover:bg-gray-300 border-t-2  border-gray-400"
                onClick={(e) => navclick(e, 'addproduct')}>
                Add Product</a>
            <a href="/admin/vieworder"
                className="w-full  text-center p-4 hover:bg-gray-300 border-t-2 border-gray-400"
                onClick={(e) => navclick(e, 'vieworder')}>
                View Orders
            </a>
            <a href="/admin/viewuser"
                className="w-full text-center p-4 hover:bg-gray-300 border-t-2 border-gray-400"
                onClick={(e) => navclick(e, 'viewuser')}>
                View Users
            </a>

        </div>
    )
}
