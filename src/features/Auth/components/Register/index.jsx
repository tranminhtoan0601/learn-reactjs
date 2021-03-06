/** @format */

import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import propTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';


Register.propTypes = {
    closeDialog: propTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();
  const handleSubmit = async (values) => {
    try {
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      const {closeDialog} = props;
      if(closeDialog) {
          closeDialog();
      }
      console.log('new user', user);
      enqueueSnackbar('Register successfully!', {variant:'success'} 
       
    );
    } catch (error) {
      console.log('failed to register', error);
      enqueueSnackbar(error.message, {variant:'error'})
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
