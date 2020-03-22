import React, { FunctionComponent } from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';
import { Lock, User } from 'grommet-icons';

const LoginForm: FunctionComponent<any> = () => {
  return (
    <Box width='medium'>
      <Form>
        <FormField htmlFor='username'>
          <TextInput
            id='username'
            icon={<User />}
            name='username'
            type='text'
            placeholder='Your username'
          />
        </FormField>
        <FormField htmlFor='password'>
          <TextInput
            id='password'
            type='password'
            icon={<Lock />}
            name='password'
            placeholder='Password'
          />
        </FormField>
        <Button type='submit' primary label='Log in' />
      </Form>
    </Box>
  );
};
export default LoginForm;
