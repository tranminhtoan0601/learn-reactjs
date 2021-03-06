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


LoginForm.propTypes = {
    onSubmit : PropTypes.func,
};

function LoginForm(props) {
    const classes = useStyles();
    const schema = yup.object().shape({

    identifier: yup.string()
   .required('Please enter your email.')
   .email('Please enter a valid eamil address.'),

   password: yup.string()
   .required('Please enter your password'),

      });

    const form = useForm({
        defaultValues: {
            identifier:'',
            password:'',
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
      Sign In
     </Typography>
       <form onSubmit={form.handleSubmit(handleSubmit)}>
     <InputField name="identifier" label="identifier" form= {form}/>
     <PasswordField name="password" label="password" form= {form}/>

     <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
         Sign in     </Button>
       </form>
   </div>
    );
}

export default LoginForm ; 