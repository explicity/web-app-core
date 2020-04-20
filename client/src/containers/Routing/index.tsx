import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Observable } from 'rxjs';

import ArticlesMenu from 'screens/ArticlesMenu';
import LoginPage from 'screens/Login/containers/LoginPage';
import RegisterPage from 'screens/Login/containers/RegisterPage';

import LoaderWrapper from 'components/LoaderWrapper';
import PrivateRoute from 'components/PrivateRoute';
import { authService } from '../../screens/Login/services/auth.service';
import { Role } from 'screens/Login/models/role';
import { IBindingAction } from 'models/callback';

import { fetchCurrentUser } from 'screens/Login/routines';

export interface IRoutingProps {
  isLoading: boolean;
  isAuthorized: boolean;
  fetchCurrentUser: IBindingAction;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({
  isLoading,
  isAuthorized,
  fetchCurrentUser
}) => {
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const { isLoggedIn }: { isLoggedIn: Observable<boolean> } = authService;

  return (
    <Switch>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/register' component={RegisterPage} />
      <LoaderWrapper loading={isLoading || (isLoggedIn && !isAuthorized)}>
        <Switch>
          <PrivateRoute
            exact
            path='/articles'
            roles={[Role.User, Role.Admin]}
            component={ArticlesMenu}
          />
          <Route path='/*' component={ArticlesMenu}>
            <Redirect to='/articles' />
          </Route>
        </Switch>
      </LoaderWrapper>
    </Switch>
  );
};

const mapDispatchToProps = {
  fetchCurrentUser
};

const mapToStateProps = state => {
  const { isLoading, isAuthorized } = state.user;

  return {
    isLoading,
    isAuthorized
  };
};

export default connect(mapToStateProps, mapDispatchToProps)(Routing);
