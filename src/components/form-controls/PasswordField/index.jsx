import { FormHelperText, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,

};

function PasswordField(props) {
    const {form, name, label, disabled} = props;
    const { errors} = form;
    const hasError =  !!errors[name];
    const[showPassword,setShowPassword] = useState(false);
    const toggleShowPasswoed = ()=>{
        setShowPassword(x =>!x);
    }
    // console.log(errors[name],formState.touched[name]);
    return (
       <div>
            {/* <Controller
        name={name}
        control={form.control}
        as={TextField}
        fullWidth
        label={label}
        disabled={disabled}
        variant="outlined"
        margin="normal"
        error={!!hasError}
        helperText={errors[name]?.message}
          /> */}

           
          <FormControl error={hasError} fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <Controller
          name={name}
          control={form.control}
          as={OutlinedInput}
            id={name}
            type={showPassword ? 'text' : 'password'}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPasswoed}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            disabled={disabled}
          />
          <FormHelperText error={!!hasError}>{errors[name]?.message}</FormHelperText>
        </FormControl>
       </div>
    );
}

export default PasswordField;