import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'store/configureStore';
import App from 'components/App';
import 'styles/styles.scss';

require('assets/favicon.ico'); // Tell webpack to load favicon.ico

// Load service worker
if (process.env.ENABLE_PWA && !process.env.ELECTRON) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./main-sw.js');
  });
}

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
