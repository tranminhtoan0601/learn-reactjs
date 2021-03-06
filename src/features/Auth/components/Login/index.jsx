/** @format */

import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import propTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';


Login.propTypes = {
    closeDialog: propTypes.func,
};

function Login(props) {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      const {closeDialog} = props;
      if(closeDialog) {
          closeDialog();
      }
      console.log('new user', user);
      
    } catch (error) {
      console.log('failed to login', error);
      enqueueSnackbar(error.message, {variant:'error'})
    }
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
