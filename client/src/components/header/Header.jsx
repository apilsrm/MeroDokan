import { useState } from 'react';
import {BsCartPlus} from "react-icons/bs"
import {AiOutlineHeart} from "react-icons/ai"
import {AiOutlineSearch} from "react-icons/ai"
import { Link } from 'react-router-dom';

const Header = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleProductDropdownToggle = () => {
    setProductDropdownOpen(!productDropdownOpen);
  };

  return (
    <nav className="bg-blue-500 p-2 flex items-center justify-between ">
      <div className="flex items-center">
        <Link to="/">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        </Link>
    
      </div>

      <div className="flex items-center  space-x-10 w-100%">
        <Link to="/"
          className={`text-white no-underline mr-4 ${
            activeTab === 'Home' ? 'font-bold' : 'font-normal'
          }`}
          onClick={() => handleTabClick('Home')}
        >
          Home
        </Link >

        <Link to="/about"
          className={` text-white no-underline hover:text-orange-400  mr-4 ${
            activeTab === 'About' ? 'font-bold' : 'font-normal'
          }`}
          onClick={() => handleTabClick('About')}
        >
          About
        </Link >

        <div className="relative space-y-1 ">
          <button
            className={` text-white mr-4 ${
              activeTab === 'Product' ? 'font-bold' : 'font-normal'
            }`}
            onClick={() => { 
              handleTabClick('Product')
              handleProductDropdownToggle()
            }}
            onBlur={() =>  setProductDropdownOpen(false)}
          >
            Product
          </button>

          {activeTab === 'Product' && productDropdownOpen && (
            <div className="absolute top-10 left-0 bg-white p-2 rounded shadow">
              <button className="text-gray-800 mb-2">Subtab 1</button>
              <button className="text-gray-800 mb-2">Subtab 2</button>
              <button className="text-gray-800">Subtab 3</button>
            </div>
          )}
        </div>

        <Link to="/contact"
          className={` text-white no-underline mr-4 ${
            activeTab === 'Contact' ? 'font-bold' : 'font-normal'
          }`}
          onClick={() => handleTabClick('Contact')}
        >
          Contact
        </Link>
        < div className=' flex items-center ml-4 mx-5'>
         <input
          type="text"
          placeholder="Search"
          className="bg-white rounded-lg px-1 py-1 focus:outline-none"
          />
          <button className=" bg-gray-600 mx-0 text-white px-2 py-2 space-x-1 rounded-lg hover:bg-black "><AiOutlineSearch/></button>
        </div>

      </div>

      <div className="flex h-10 text-white w-100%">
        <h4 className='mr-3 py-1'>Wishlist</h4>
        <p  className='py-1 mr-4'><AiOutlineHeart className='w-8 h-8' /></p>
       <button className="text-white w-10 h-10"><BsCartPlus className='w-8 h-8'/></button>
      </div>
    </nav>
  );
};

export default Header;
