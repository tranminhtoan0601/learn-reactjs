import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import InputField from '../../../../components/form-controls/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputField from 'components/form-controls/InputField';
import { Input } from '@material-ui/core';




TodoForm.propTypes = {
    onSubmit : PropTypes.func,
};

function TodoForm(props) {
    const schema = yup.object().shape({
        title: yup.string()
        .required('please enter title')
        .min( 5, 'title is too short'),
      });
    const form = useForm({
        defaultValues: {
            title:'',
        },
        resolver: yupResolver(schema),
    });
    const handleSubmit = (values) => {
        // console.log('TODO FORM: ',values);
        const {onSubmit} = props;
        if(onSubmit) {
            onSubmit(values);
        }
        form.reset();
    }
    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
     
            <InputField name="title" label="Todo" form= {form}/>
        </form>
    );
}

export default TodoForm; 