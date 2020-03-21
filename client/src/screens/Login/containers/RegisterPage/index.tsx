import React from 'react';
import { Heading, Box } from 'grommet';

import RegisterForm from '../../components/RegisterForm';
import './styles.module.scss';

class RegisterPage extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Box fill align='center' justify='center'>
          <div>
            <Heading level='2'>Sign up</Heading>
            <RegisterForm />
          </div>
        </Box>
      </div>
    );
  }
}

export default RegisterPage;
