import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './sidebar.scss';
import { IRootState } from '../../Store/store';
import { signOutUser } from '../../Store/user/actions';

const Sidebar = () => {

  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  
  return user._id
    ? <div className='sidebar'>
      <div className='sidebar__user'>
        <h3>
          {user.firstName}<br/>
          {user.lastName}
        </h3>
        <p>{user.email}</p>
        <button
          className='button' 
          onClick={() => dispatch(signOutUser())}>
          Sign out
        </button>
      </div>
      <div className='sidebar__navigation'>
        <Link to='/'>Home Page</Link>
        <Link to='/test'>Test Page</Link>
      </div>
    </div>
    : null
};

export default Sidebar;
