import React from 'react'

const DormViewCard = ({title, image, avl_rooms}) => {
    return (
    <div className="">
        <div className="relative">
            <img src={image} alt="" className="object-cover rounded-t-[1.3rem]" />
        </div>
        <div className="description-bg items-center flex justify-between items-start rounded-b-[1.3rem]">
            <div className="max-w-[5rem] pl-3 pb-1">
                <div className="text-white font-bold text-[20px] flex items-center">
                    {title}
                </div>
            </div>
            <div className="flex max-w-[6rem] items-center pr-2 space-x-2">
                <p className="text-white text-[20px]">
                    |
                </p>
                <p className="text-white text-[20px] font-semibold">
                    {avl_rooms} 
                </p>
                <p className="text-white text-[10px]">
                    Rooms Available
                </p>
            </div>
        </div>
    </div>

    )
}

export default DormViewCard
