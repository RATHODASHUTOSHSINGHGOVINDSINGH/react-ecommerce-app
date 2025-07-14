import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { FaSearch } from 'react-icons/fa';
import { ShoppingCart } from 'lucide-react';
 import { Menu } from 'lucide-react';
 import { X } from 'lucide-react';
 
const Navbar = () => {
  const navigate = useNavigate();
 
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className=" bg-white shadow-lg flex w-full  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="text-indigo-500 text-xl font-bold transition-colors">
            ShopSmart
          </Link>

          
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <button 
                  type="submit" 
                  aria-label="Search"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                ></button>
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-12 text-gray-900 bg-white 
                  border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
               
                
              </div>
            </form>
          </div>

          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="     text-gray-700 px-4 py-2 font-medium hover:font-bold transition-all duration-150 ">
              Home
            </Link>
            <Link to="/about" className="   text-gray-700 px-4 py-2 font-medium hover:font-bold transition-all duration-150">
              About
            </Link>
            
            {isLoggedIn ? (
              <div className="flex items-center ">
                <button 
                  onClick={handleLogout}
                  className="   text-gray-700 px-4 py-2 font-medium hover:font-bold transition-all duration-150 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="   text-gray-700 px-4 py-2 font-medium hover:font-bold transition-all duration-150">
                Login
              </Link>
            )}
            
             
            <Link to="/cart" className="text-xl text-gray-700 px-4 py-2 font-medium hover:font-bold transition-all duration-150">
              <ShoppingCart />
               
            </Link>
          </div>

          
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black transition-colors"
            >
               
                {isMenuOpen ? (
                   <X />
                ) : (
                      <Menu  />
                )}
              
            </button>
          </div>
        </div>

         
        <div className="md:hidden px-4 py-3 bg-white border-t border-gray-200">
          <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <button 
                  type="submit" 
                  aria-label="Search"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                ></button>
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-12 text-gray-900 bg-white 
                  border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
               
                
              </div>
          </form>
        </div>

         
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white text-center">
             
              <Link
                to="/"
                className="block px-3 py-2 text-black rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-black rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {isLoggedIn ? (
                <>
                   
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-black rounded-md transition-colors text-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-black rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              
              <Link
                to="/cart"
                className="block px-3 py-2 text-black rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart  
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;