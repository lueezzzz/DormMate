import React from 'react'
import Navbar from '../components/Navbar';
import "../index.css"
import Headline from '@/components/Headline';

import dorm1 from '../assets/images/dorm1.jpg'
import DormViewCard from '@/components/DormViewCard';

const TransientView = () => {
  const dorms = [
    {title: "Balay Madyaas", image: dorm1, avl_rooms: "15"},
    {title: "Balay Kanlaon", image: dorm1, avl_rooms: "10"},
    {title: "Balay Lampirong", image: dorm1, avl_rooms: "10"},
    {title: "Balay Gumamela", image: dorm1, avl_rooms: "10"},
    {title: "Balay Apitong", image: dorm1, avl_rooms: "12"},
    {title: "Balay Miagos", image: dorm1, avl_rooms: "10"},
    {title: "International Dormitory", image: dorm1, avl_rooms: "10"},
    {title: "Balay Ilonggo", image: dorm1, avl_rooms: "13"},
  ];
  
  return (
    <>
      <Navbar />
      <Headline />
      <div className="mx-20 mb-10"> 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dorms.map((dorm) => (
          <DormViewCard 
            title={dorm.title}
            image={dorm.image}
            avl_rooms={dorm.avl_rooms}/>
          ))}
      </div>
    </div>
    </>
  );
}

export default TransientView
