import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '../authPage.scss';
import { IRootState } from '../../Store/store';
import { signInUser, getUser } from '../../Store/user/actions';

const SignInPage = () => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { from }: any = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (user._id) history.replace(from);
    else dispatch(getUser());
  }, [user._id, from, dispatch, history]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(signInUser({
      email,
      password,
    }));
  };
  
  return (
    <div className='container authPage'>
      <h2 className='authPage__header'>Sign in</h2>
        <form
          className='authPage__form'
          onSubmit={event => handleSubmit(event)}>
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
            className='button'
            data-testid='submit'
            type='submit'
            value={'Sign in'} />
      </form>
      {user.error.data &&
        <p className='authPage__error'
          data-testid='serverErorMsg'>
          {user.error.data}
      </p>}
      <p>Don't have an account? <NavLink className='link' to='/register'>Register</NavLink></p>
    </div>
  );
};

export default SignInPage;
