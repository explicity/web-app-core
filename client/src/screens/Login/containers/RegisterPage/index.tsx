import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Heading, Box } from 'grommet';

import RegisterForm from '../../components/RegisterForm';
import ErrorMessage from '../../components/ErrorMessage';

import { IBindingCallback1 } from 'models/callback';
import { IGlobalState } from 'models/global-state';
import { IUserRegistration } from '../../models/user';

import { register } from '../../routines';

import styles from './styles.module.scss';

interface IRegisterPageProps {
  register: IBindingCallback1<IUserRegistration>;
  isAuthorized: boolean;
  loading: boolean;
  error: string | null;
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
    const { isAuthorized, loading, error } = this.props;

    return !isAuthorized ? (
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
            {error && <ErrorMessage error={error} />}
            <Heading level='2' margin={{ bottom: '30px' }}>
              Sign up
            </Heading>
            <RegisterForm handleSubmit={this.handleSubmit} loading={loading} />
            <Link to='/login' className={styles.link}>
              I am already member
            </Link>
          </div>
        </Box>
      </Box>
    ) : (
      <Redirect to='/' />
    );
  }
}

const mapStateToProps = (state: IGlobalState) => {
  const { loading, error } = state.user.requests.auth;

  return {
    loading,
    error
  };
};

const mapDispatchToProps = {
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
