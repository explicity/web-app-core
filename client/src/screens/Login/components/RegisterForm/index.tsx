import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { withFormik } from 'formik';
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import { Lock, User, MailOption } from 'grommet-icons';

interface IRegisterFormProps {}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have at least 4 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const RegisterForm: FunctionComponent<any> = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit
}) => {
  return (
    <Box width='medium'>
      <Form onSubmit={handleSubmit}>
        <FormField>
          <TextInput
            icon={<User />}
            name='username'
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Your username'
          />
        </FormField>
        <FormField>
          <TextInput
            icon={<MailOption />}
            name='email'
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Your email'
          />
        </FormField>
        <FormField>
          <TextInput
            icon={<Lock />}
            name='password'
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Password'
          />
        </FormField>
        <FormField>
          <TextInput
            icon={<Lock />}
            name='confirmPassword'
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder='Repeat your password'
          />
        </FormField>
        <Button type='submit' label='Register' />
      </Form>
    </Box>
  );
};

export default withFormik({
  mapPropsToValues: () => ({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }),
  handleSubmit: (values, actions) => {
    console.log(values, actions);
  },
  validationSchema: validationSchema
})(RegisterForm);
