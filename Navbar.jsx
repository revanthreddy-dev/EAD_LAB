import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '15px', backgroundColor: '#e0e0e0', textAlign: 'center', borderRadius: '5px', margin: '20px' }}>
      <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>Home</Link>
      <Link to="/about" style={{ margin: '0 15px', textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>About</Link>
      <Link to="/contact" style={{ margin: '0 15px', textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>Contact</Link>
    </nav>
  );
};

export default Navbar;
