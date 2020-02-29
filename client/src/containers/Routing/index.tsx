import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ArticlesMenu from 'screens/ArticlesMenu';

export interface IRoutingProps {}

const Routing: React.FunctionComponent<IRoutingProps> = () => {
  return (
    <div>
      <Switch>
        <Route path='/*' component={ArticlesMenu}>
          <Redirect to='/articles' />
        </Route>
      </Switch>
    </div>
  );
};

export default Routing;
