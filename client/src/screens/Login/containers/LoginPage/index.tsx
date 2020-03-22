import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Heading, Box } from 'grommet';

import LoginForm from '../../components/LoginForm';
import { login } from '../../routines';
import styles from './styles.module.scss';

class LoginPage extends React.Component<any, any> {
  render() {
    return (
      <Box
        align='center'
        justify='center'
        background={{ color: '#f8f8f8' }}
        className={styles.wrapper}
      >
        <Box
          pad='medium'
          align='center'
          background={{ color: '#fff' }}
          elevation='large'
          round='xsmall'
        >
          <div>
            <Heading level='2' margin={{ bottom: '30px' }}>
              Sign in
            </Heading>
            <LoginForm />
            <Link to='/register'>Create an account</Link>
          </div>
        </Box>
      </Box>
    );
  }
}

const mapDispatchToProps = {
  login
};

export default connect(null, mapDispatchToProps)(LoginPage);
