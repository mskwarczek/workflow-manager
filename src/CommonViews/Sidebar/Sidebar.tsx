import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signOutUser } from '../../Store/user/actions';

const Sidebar = () => {

  const dispatch = useDispatch();
  
  return (
    <div>
      Sidebar
      <button onClick={() => dispatch(signOutUser())}>Sign out</button>
      <Link to='/'>Home Page</Link>
      <Link to='/test'>Test Page</Link>
    </div>
  );
};

export default Sidebar;
