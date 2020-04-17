import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  
  return (
    <div>
        Sidebar
        <Link to='/'>To home</Link>
        <Link to='/test'>To test</Link>
    </div>
  );
};

export default Sidebar;
