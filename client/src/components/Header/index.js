import React from 'react';
//import Brand from './Brand'
import Navbar from '../Navbar';


const Header = () => {
  
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Navbar/>
        </div>
      </div>
    </header>
  );
};

export default Header;
