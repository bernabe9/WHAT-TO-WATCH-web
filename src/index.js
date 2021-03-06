import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import App from './components/App';
import './styles/styles.scss';

require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();

const renderApp = (Component) => {
  render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp(App);
  });
}
