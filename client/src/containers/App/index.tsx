import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Grommet } from 'grommet';

import Routing from 'containers/Routing';
import theme from './theme';
import { history } from 'helpers/history.helper';
import { store } from 'store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Grommet theme={theme}>
          <Routing />
        </Grommet>
      </Router>
    </Provider>
  );
}

export default App;
