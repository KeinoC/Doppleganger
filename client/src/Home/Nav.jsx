import React, {useState} from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';

const Nav = () => {

  const [nav,setNav]= useState(false);

  const links = [
    {
      id: 1,
      link: 'home'
    },
    {
      id: 2,
      link: 'demo'
    },
    {
      id: 3,
      link: 'about'
    },
    {
      id: 4,
      link: 'contact us'
    }
  ]
  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white ">
      <div>
          <h1 className=" select-none text-5xl font-signature ml-2">Doppelgänger</h1>
      </div>

      <ul className="hidden md:flex">
       
        {links.map(({id, link}) => (
          <li 
            key ={id} 
            className="px-4 cursor-pointer capitalize font-medium text-white hover:text hover:scale-105 duration-200">

            <Link 
              to={link} 
              smooth duration={500}>
              {link}
            </Link>
          </li>
        ))}
      </ul>

    <div onClick ={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-white md:hidden">
      {nav ? <FaTimes size={30} /> : <FaBars size={30} /> }
    </div>


    {nav && (

    

      <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">


        {links.map(({id, link}) => (
          <li 
            key={id} 
            className="px4 cursor-pointer capitalize py-6 text-4xl">

          <Link 
            onClick={() => setNav(!nav)}
            to={link} 
            smooth duration={500}>
            {link}
          </Link>
        </li>
      ))}

      </ul>
    )}
    </div>
  );
};

export default Nav;