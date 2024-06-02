import React from 'react'

function Avatar({name}) {
    return (
        <div className="flex items-center">
            <div className="bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center ">
                {name[0]}
            </div>
        </div>
    )
}

export default Avatar;