import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps } from 'formik';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { Lock, User, MailOption } from 'grommet-icons';

import { IBindingCallback1 } from 'models/callback';
import { IUserRegistration } from '../../models/user';

interface IFormValues extends IUserRegistration {
  confirmPassword: string;
}

interface IRegisterFormProps {
  handleSubmit: IBindingCallback1<IFormValues>;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .label('Password')
    .required('Password is required')
    .min(4, 'Password must have at least 4 characters '),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required')
});

const RegisterForm: FunctionComponent<IRegisterFormProps &
  FormikProps<IFormValues>> = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}: FormikProps<IFormValues>) => {
  const usernameError = errors.username && touched.username;
  const passwordError = errors.password && touched.password;
  const emailError = errors.email && touched.email;
  const confirmPasswordError =
    errors.confirmPassword && touched.confirmPassword;
  const disabled =
    isSubmitting ||
    usernameError ||
    passwordError ||
    emailError ||
    confirmPasswordError;

  return (
    <Box width='medium'>
      {/*
      // @ts-ignore */}
      <Form onSubmit={handleSubmit}>
        <Box margin={{ bottom: '30px' }}>
          <FormField
            htmlFor='username'
            error={usernameError && errors.username}
          >
            <TextInput
              id='username'
              icon={<User />}
              name='username'
              type='text'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Your username'
            />
          </FormField>
          <FormField htmlFor='email' error={emailError && errors.email}>
            <TextInput
              id='email'
              icon={<MailOption />}
              name='email'
              type='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Your email'
            />
          </FormField>
          <FormField
            htmlFor='password'
            error={passwordError && errors.password}
          >
            <TextInput
              id='password'
              icon={<Lock />}
              name='password'
              type='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Password'
            />
          </FormField>
          <FormField
            htmlFor='confirmPassword'
            error={confirmPasswordError && errors.confirmPassword}
          >
            <TextInput
              id='confirmPassword'
              icon={<Lock />}
              name='confirmPassword'
              type='password'
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Repeat your password'
            />
          </FormField>
        </Box>
        <Button
          type='submit'
          primary
          color='neutral-3'
          label='Register'
          disabled={disabled}
          margin={{ bottom: '30px' }}
        />
      </Form>
    </Box>
  );
};

export default withFormik<IRegisterFormProps, IFormValues>({
  mapPropsToValues: () => ({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  }),
  handleSubmit: (values, bag) => bag.props.handleSubmit(values),
  validationSchema
})(RegisterForm);
