import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import history from '../utils/history';
import routes from '../routes';

const App = () => (
  <ConnectedRouter history={history}>
    <Switch>
      {routes.map((route, index) =>
        <Route
          key={`route${index}`}
          {...route}
        />
      )}
    </Switch>
  </ConnectedRouter>
);

export default App;

