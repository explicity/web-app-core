import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Heading, Box } from 'grommet';

import RegisterForm from '../../components/RegisterForm';
import { register } from '../../routines';

import { IBindingCallback1 } from 'models/callback';
import { IUserRegistration } from '../../models/user';

import styles from './styles.module.scss';

interface IRegisterPageProps {
  register: IBindingCallback1<IUserRegistration>;
}
interface IRegisterPageState {}

class RegisterPage extends React.Component<
  IRegisterPageProps,
  IRegisterPageState
> {
  @boundMethod
  handleSubmit(user: IUserRegistration) {
    const { register } = this.props;

    if (user.password && user.username && user.email) {
      register(user);
    }
  }

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
              Sign up
            </Heading>
            <RegisterForm handleSubmit={this.handleSubmit} />
            <Link to='/login' className={styles.link}>
              I am already member
            </Link>
          </div>
        </Box>
      </Box>
    );
  }
}

const mapDispatchToProps = {
  register
};

export default connect(null, mapDispatchToProps)(RegisterPage);
