import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import '../authPage.scss';
import { IRootState } from '../../Store/store';
import { registerUser } from '../../Store/user/actions';

const RegisterPage = () => {

  interface FormField {  
    value: string;
    error: string;
  };
  
  const initialState: FormField = {
    value: '',
    error: '',
  };

  const [ firstName, setFirstName ] = useState(initialState);
  const [ lastName, setLastName ] = useState(initialState);
  const [ email, setEmail ] = useState(initialState);
  const [ password, setPassword ] = useState(initialState);
  const [ confirmPassword, setConfirmPassword ] = useState(initialState);

  const serverError = useSelector((state: IRootState) => state.user.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const validateInputLength = (setFunction: (val: FormField) => void, value: string) => {
    value.length <= 30
      ? setFunction({ value, error: '' })
      : setFunction({ value: value.slice(0, 30), error: 'Maximum length of input field is 30 characters.' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'firstName': validateInputLength(setFirstName, value); break;
      case 'lastName': validateInputLength(setLastName, value); break;
      case 'email': validateInputLength(setEmail, value); break;
      case 'password': validateInputLength(setPassword, value); break;
      case 'confirmPassword': validateInputLength(setConfirmPassword, value); break;
      default: return;
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)) setEmail({ ...email, error: 'Invalid email address.' });
    if (password.value !== confirmPassword.value) setConfirmPassword({ ...confirmPassword, error: 'Passwords aren\'t identical.' });
    if (firstName.error || lastName.error || email.error || password.error || confirmPassword.error) return;
    dispatch(registerUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    }));
  };
  
  return (
    <div className='container authPage'>
      <div className='authPage__header'>
        <h2>Register</h2>
        <p>Create your free account.</p>
      </div>
        <form
          className='authPage__form'
          onSubmit={event => handleSubmit(event)}>
          <input
            className='formInput'
            data-testid='firstName'
            type='text'
            name='firstName'
            placeholder={'First name'}
            value={firstName.value}
            onChange={handleChange}
            required />
          {firstName.error && <p data-testid='errorMsg'>{firstName.error}</p>}
          <input
            className='formInput'
            data-testid='lastName'
            type='text'
            name='lastName'
            placeholder={'Last name'}
            value={lastName.value}
            onChange={handleChange}
            required />
          {lastName.error && <p data-testid='errorMsg'>{lastName.error}</p>}
          <input
            className='formInput'
            data-testid='email'
            type='email'
            name='email'
            placeholder={'Email'}
            value={email.value}
            onChange={handleChange}
            required />
          {email.error && <p data-testid='errorMsg'>{email.error}</p>}
          <input
            className='formInput'
            data-testid='password'
            type='password'
            name='password'
            placeholder={'Password'}
            value={password.value}
            onChange={handleChange}
            required />
          {password.error && <p data-testid='errorMsg'>{password.error}</p>}
          <input
            className='formInput'
            data-testid='confirmPassword'
            type='password'
            name='confirmPassword'
            placeholder={'Confirm password'}
            value={confirmPassword.value}
            onChange={handleChange}
            required />
          {confirmPassword.error && <p data-testid='errorMsg'>{confirmPassword.error}</p>}
          {/* Links to terms of use etc. go here */}
          <input
            className='button'
            data-testid='submit'
            type='submit'
            value={'Register'} />
      </form>
      <button
        className='button'
        onClick={() => history.goBack()}>
        Back
      </button>
      {serverError.data && serverError.status !== 401 &&
        <p className='authPage__error'
          data-testid='serverErorMsg'>
          {serverError.data}
        </p>}
      <p className='authPage__redirect'>Already have an account? <NavLink className='link' to='/signin'>Sign in</NavLink></p>
    </div>
  );
};

export default RegisterPage;
