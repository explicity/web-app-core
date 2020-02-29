import React from 'react';
import { Router } from 'react-router-dom';

import Routing from 'containers/Routing';
import { history } from 'helpers/history.helper';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Routing />
      </Router>
    </div>
  );
}

export default App;
