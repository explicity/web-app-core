import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Grommet } from 'grommet';

import ArticlesMenu from 'screens/ArticlesMenu';
import LoginPage from 'screens/Login/containers/LoginPage';
import RegisterPage from 'screens/Login/containers/RegisterPage';

export interface IRoutingProps {}

const Routing: React.FunctionComponent<IRoutingProps> = () => {
  return (
    <Grommet>
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route path='/articles' component={ArticlesMenu} />
        <Route path='/*' component={ArticlesMenu}>
          <Redirect to='/articles' />
        </Route>
      </Switch>
    </Grommet>
  );
};

export default Routing;
