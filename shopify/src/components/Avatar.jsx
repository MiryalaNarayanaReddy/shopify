import React from 'react'

function Avatar({name}) {
    // dropdown for profile and my orders

    const [showDropdown, setShowDropdown] = React.useState(false);

    return (
        <div className="relative">


            <div className="w-8 h-8 bg-gray-500 rounded-full flex justify-center items-center text-white" 
            onClick={() => setShowDropdown(!showDropdown)} >
                {name[0].toUpperCase()}

            </div>

            {
                showDropdown && 
                // <div className="absolute z-10 w-48 bg-white rounded-lg shadow-lg p-4 m-4">
                //     <div className="relative bg-white rounded-lg shadow-lg p-4 m-4">

                //     <div className="text-lg font-bold cursor-pointer" onClick={() => window.location.href = '/myorders'}>My Orders</div>
                //     <div className="text-lg font-bold cursor-pointer" onClick={() => window.location.href = '/profile'}>Profile</div>
                  
                //     </div>
                // </div>

              
                    <div className="absolute bg-white rounded-lg shadow-lg p-4 m-4 top-10 -right-6">
                        <div className="text-lg font-bold cursor-pointer" onClick={() => window.location.href = '/profile'}>Profile</div>
                        <div className='border-b-2 border-gray-200'></div>
                        <div className="text-lg font-bold cursor-pointer" onClick={() => window.location.href = '/myorders'}>Orders</div>
                    </div>
              
            }
        
        </div>
    )
}

export default Avatar;