import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Grommet } from 'grommet'

import ArticlesMenu from 'screens/ArticlesMenu';

export interface IRoutingProps {}

const Routing: React.FunctionComponent<IRoutingProps> = () => {
  return (
    <Grommet>
      <Switch>
        <Route path='/articles' component={ArticlesMenu} />
        <Route path='/*' component={ArticlesMenu}>
          <Redirect to='/articles' />
        </Route>
      </Switch>
    </Grommet>
  );
};

export default Routing;
