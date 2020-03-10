import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import Routing from 'containers/Routing';
import { history } from 'helpers/history.helper';
import { store } from 'store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routing />
      </Router>
    </Provider>
  );
}

export default App;
