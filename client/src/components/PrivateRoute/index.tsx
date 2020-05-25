import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { authService } from '../../screens/Login/services/auth.service';

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { tokenValue }: { tokenValue: string } = authService;

      if (!tokenValue || !rest.isAuthorized) {
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }

      if (
        rest.user &&
        roles &&
        !roles.filter((value: string) =>
          rest.user.roles.some(item => item.role === value)
        ).length
      ) {
        return <Redirect to={{ pathname: '/404' }} />;
      }
      return <Component {...props} />;
    }}
  />
);

const mapToStateProps = (state: any) => {
  const { isAuthorized, user } = state.user.profile;

  return {
    isAuthorized,
    user
  };
};

export default connect(mapToStateProps, null)(PrivateRoute);
