import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { boundMethod } from 'autobind-decorator';
import { Heading, Box } from 'grommet';

import LoginForm from '../../components/LoginForm';
import ErrorMessage from '../../components/ErrorMessage';

import { IBindingCallback1 } from 'models/callback';
import { IGlobalState } from 'models/global-state';
import { IUser } from '../../models/user';

import { login } from '../../routines';

import styles from './styles.module.scss';

interface IRegisterPageProps {
  login: IBindingCallback1<IUser>;
  isAuthorized: boolean;
  loading: boolean;
  error: string | null;
}
interface IRegisterPageState {}

class LoginPage extends React.Component<
  IRegisterPageProps,
  IRegisterPageState
> {
  @boundMethod
  handleSubmit(data: IUser) {
    const { login } = this.props;

    if (data.email && data.password) {
      login(data);
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
              Sign in
            </Heading>
            <LoginForm handleSubmit={this.handleSubmit} loading={loading} />
            <Link to='/register' className={styles.link}>
              Create an account
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
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
