import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps } from 'formik';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { Lock, MailOption } from 'grommet-icons';

import { IBindingCallback1 } from 'models/callback';
import { IUser } from '../../models/user';

interface ILoginFormProps {
  handleSubmit: IBindingCallback1<IUser>;
  loading: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().label('Email').required('Email is required'),
  password: Yup.string().label('Password').required('Password is required')
});

const LoginForm: FunctionComponent<ILoginFormProps & FormikProps<IUser>> = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  loading
}) => {
  const emailError = errors.email && touched.email;
  const passwordError = errors.password && touched.password;
  const disabled = loading || emailError || passwordError;

  return (
    <Box width='medium'>
      {/*
      // @ts-ignore */}
      <Form onSubmit={handleSubmit}>
        <Box margin={{ bottom: '30px' }}>
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
              type='password'
              icon={<Lock />}
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Password'
            />
          </FormField>
        </Box>
        <Button
          type='submit'
          primary
          color='neutral-3'
          label='Log in'
          disabled={disabled}
          margin={{ bottom: '30px' }}
        />
      </Form>
    </Box>
  );
};

export default withFormik<ILoginFormProps, IUser>({
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  handleSubmit: (values, bag) => bag.props.handleSubmit(values),
  validationSchema
})(LoginForm);
