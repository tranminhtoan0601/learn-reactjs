import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from 'components/form-controls/InputField';
import { Avatar, Button, Input, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PasswordField from 'components/form-controls/PasswordField';

const useStyles = makeStyles((theme) =>({
  root: {
      position:'relative',
      paddingTop:theme.spacing(2),
  },
  avatar:{
      margin:'0 auto',
      backgroundColor: theme.palette.secondary.main,

  },
  title:{
      textAlign: 'center',
      margin:theme.spacing(1,0,3,0),
  },
  submit:{
    margin:theme.spacing(3,0,2,0),
  },
  progress: {
   position: 'absolute',
   top: theme.spacing(1),
   left: 0,
   right:0,
  },
}));


RegisterForm.propTypes = {
    onSubmit : PropTypes.func,
};

function RegisterForm(props) {
    const classes = useStyles();
    const schema = yup.object().shape({
   fullName: yup
   .string()
   .required('Please enter your full name.')
   .test('should has at least two word','Please enter at least two words.',(value) => {
   return value.split(' ').length >= 2;
   }),

   email: yup.string()
   .required('Please enter your email.')
   .email('Please enter a valid eamil address.'),

   password: yup.string()
   .required('Please enter your password')
   .min(6, 'Plesase enter at least 6 words.'),

   RetypePassword: yup.string()
   .required('Please enter your retype password')
   .oneOf([yup.ref('password')], 'password does not match'),
      });

    const form = useForm({
        defaultValues: {
            fullName:'',
            email:'',
            password:'',
            RetypePassword:'',
        },
        resolver: yupResolver(schema),
    });
    const handleSubmit = async (values) => {
        // console.log('TODO FORM: ',values);
        const {onSubmit} = props;
        if(onSubmit) {
          await  onSubmit(values);
        }
        // form.reset();
    }
    const { isSubmitting } = form.formState;
    return (
   <div className={classes.root}>
       {isSubmitting && <LinearProgress className={classes.progress} />}
     <Avatar className={classes.avatar}>
         <LockOutlined></LockOutlined>
     </Avatar>
     <Typography className={classes.title} component="h3" vaiant="h5"> 
      Create An Acount
     </Typography>
       <form onSubmit={form.handleSubmit(handleSubmit)}>
     <InputField name="fullName" label="fullName" form= {form} />
     <InputField name="email" label="email" form= {form}/>
     <PasswordField name="password" label="password" form= {form}/>
     <PasswordField name="RetypePassword" label="RetypePassword" form= {form}/>

     <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
         Create an account
     </Button>
       </form>
   </div>
    );
}

export default RegisterForm; 