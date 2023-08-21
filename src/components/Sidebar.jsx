import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseFill } from 'react-icons/ri';
import { BsSpotify } from 'react-icons/bs';
import { links } from '../assets/constants';
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className='flex flex-row justify-start 
          items-center my-8 text-sm font-medium
           text-gray-400 hover:text-gray-400'
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className='w-6 h-6 mr-2' />
        {item.name}
      </NavLink>
    ))}
  </div>
)


const Sidebar = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-black'>
        <span className="flex gap-5 justify-center font-bold text-2xl items-center text-white"> <i className="text-[30px] text-green-500"><BsSpotify /> </i> Spotify</span>
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ?
          <RiCloseFill className="w-6 h-6 text-white m-2" onClick={() => setMobileMenuOpen(false)} />
          :
          <HiOutlineMenu className="w-6 h-6 text-white m-2" onClick={() => setMobileMenuOpen(true)} />
        }
      </div>

      <div className={`absolute top-0 h-screen w-2/3
       bg-black backdrop:blur-lg z-10 p-6 md:hidden 
       smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'} `}>
        <span className="flex gap-5 mt-10  justify-center font-bold text-2xl items-center text-white"> <i className="text-[30px] text-green-500"><BsSpotify /> </i> Spotify</span>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
      
    </>
  )
};

export default Sidebar;
