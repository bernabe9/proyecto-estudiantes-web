import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import { AppContainer } from 'react-hot-loader';

import configureStore from '../src/store/configureStore';
import App from '../src/components/App';
import '../src/styles/styles.scss';

require('../src/favicon.ico'); // Tell webpack to load favicon.ico

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const store = configureStore(Immutable.fromJS(preloadedState));

const renderApp = (Component) => {
  hydrate(
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
  module.hot.accept();
}
