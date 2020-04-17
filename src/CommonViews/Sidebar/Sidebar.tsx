import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  
  return (
    <div>
        Sidebar
        <Link to='/'>Home Page</Link>
        <Link to='/test'>Test Page</Link>
    </div>
  );
};

export default Sidebar;
