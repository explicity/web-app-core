import React, { FunctionComponent } from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps } from 'formik';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { Lock, User } from 'grommet-icons';

import { IBindingCallback1 } from 'models/callback';
import { IUser } from '../../models/user';

interface ILoginFormProps {
  handleSubmit: IBindingCallback1<IUser>;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .label('Password')
    .required('Password is required')
});

const LoginForm: FunctionComponent<ILoginFormProps & FormikProps<IUser>> = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => {
  const usernameError = errors.username && touched.username;
  const passwordError = errors.password && touched.password;
  const disabled = isSubmitting || usernameError || passwordError;

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
    username: '',
    password: ''
  }),
  handleSubmit: (values, bag) => bag.props.handleSubmit(values),
  validationSchema
})(LoginForm);
