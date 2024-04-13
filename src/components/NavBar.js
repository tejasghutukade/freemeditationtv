import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const NavBar = (props) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Menu items
    const menuItems = [
      { name: 'Home', url: '/' ,target: '_self' },
      { name: 'Free Classes', url: 'https://www.freemeditation.com/meditation-classes/' ,target: '_blank'},
      { name: 'About', url: '/about' ,target: '_self' },
      { name: 'Contact', url: '/contact',target: '_self' },
      { name: 'Meditation Basics', url: 'https://www.freemeditation.com/meditation-basics/', target: '_blank' },
      { name: 'Benefits of Meditation', url: '/benefits-of-meditation',target: '_self' },
      { name: 'Blog', url: 'https://freemeditationtv.blog/',target: '_blank'},
      { name: 'Meditation at home', url: '/meditateathome',target: '_self' },
    ];

    return (
      <nav style={{ backgroundColor: '#5d5d5d' }} className="px-4 py-2 shadow-md">
          <div className="mx-auto flex justify-between items-center md:px-4 md:py-2 md:shadow-md md:flex md:justify-center md:items-center">
              <img src="freemeditationtv_logo.png" alt="Logo" className="mr-2 w-10 h-10" />
              <div className="md:hidden">
                  <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                      {/* Hamburger Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                  </button>
              </div>
              {
                !isMenuOpen && <ul className={`${
                  isMenuOpen ? 'block' : 'hidden'
              } md:block md:flex md:justify-center md:items-center w-full md:w-auto`}>
                  {menuItems.map((item, index) => (
                      <li
                          key={index}
                          style={location.pathname === item.url ? { backgroundColor: '#7b7b7b' } : {}}
                          className='md:px-4 md:py-2 rounded-md hover:bg-gray-700 md:hover:bg-transparent md:border-0 text-white block md:inline-block'
                      >
                          <a
                              href={item.url}
                              target={item.target}
                          >
                              {item.name}
                          </a>
                      </li>
                  ))}
              </ul>
              }
              
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
              <ul className="flex flex-col md:hidden w-full bg-gray-600">
                  {menuItems.map((item, index) => (
                      <li
                          key={index}
                          style={location.pathname === item.url ? { backgroundColor: '#7b7b7b' } : {}}
                          className='px-4 py-2 hover:bg-gray-700 text-white'
                      >
                          <a
                              href={item.url}
                              target={item.target}
                          >
                              {item.name}
                          </a>
                      </li>
                  ))}
              </ul>
          )}
      </nav>
  );
}

export default NavBar;
