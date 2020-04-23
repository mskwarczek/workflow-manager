import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { IRootState } from '../../Store/store';
import { signInUser, getUser } from '../../Store/user/actions';

const SignInPage = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const userState = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from }: any = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (userState._id) history.replace(from);
    else dispatch(getUser());
  }, [userState._id, from, dispatch, history]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signInUser({
      email,
      password,
    }));
  };
  
  return (
    <div>
      <h2>Sign in</h2>
        <form onSubmit={event => handleSubmit(event)}>
          <input
            className='formInput'
            data-testid='email'
            type='email'
            name='email'
            placeholder={'Email'}
            value={email}
            onChange={event => setEmail(event.target.value)}
            required />
          <input
            className='formInput'
            data-testid='password'
            type='password'
            name='password'
            placeholder={'Password'}
            value={password}
            onChange={event => setPassword(event.target.value)}
            required />
          <input
            className='button button--important'
            data-testid='submit'
            type='submit'
            value={'Sign in'} />
          {userState.error && <p data-testid='serverErorMsg'>{userState.error}</p>}
      </form>
      <p>Don't have an account?</p><NavLink className='link' to='/register'>Register</NavLink>
    </div>
  );
};

export default SignInPage;
