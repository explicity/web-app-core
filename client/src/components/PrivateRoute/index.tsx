import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Observable } from 'rxjs';

import { authService } from '../../screens/Login/services/auth.service';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { isLoggedIn }: { isLoggedIn: Observable<boolean> } = authService;

      if (!isLoggedIn) {
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }
      if (
        rest.currentUser &&
        roles &&
        !roles.filter((value: string) => rest.currentUser.roles.includes(value))
          .length
      ) {
        return <Redirect to={{ pathname: '/404' }} />;
      }
      return <Component {...props} />;
    }}
  />
);

const mapToStateProps = (state: any) => ({
  currentUser: state.user
});

export default connect(null, mapToStateProps)(PrivateRoute);
