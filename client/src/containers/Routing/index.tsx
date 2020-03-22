import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Grommet } from 'grommet';

import ArticlesMenu from 'screens/ArticlesMenu';
import LoginPage from 'screens/Login/containers/LoginPage';
import RegisterPage from 'screens/Login/containers/RegisterPage';

import LoaderWrapper from 'components/LoaderWrapper';
import PrivateRoute from 'components/PrivateRoute';
import { authService } from '../../screens/Login/services/auth.service';
import { Role } from 'screens/Login/models/role';

export interface IRoutingProps {
  isLoading: boolean;
  isAuthorized: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({
  isLoading,
  isAuthorized
}) => {
  const token = authService.tokenValue;

  return (
    <Grommet>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <LoaderWrapper loading={isLoading || (token && !isAuthorized)}>
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
    </Grommet>
  );
};

export default Routing;
