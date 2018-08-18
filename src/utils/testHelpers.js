import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

export const withStore = (WrappedComponent, store) => (
  <MemoryRouter>
    <Provider store={store}>
      {WrappedComponent}
    </Provider>
  </MemoryRouter>
);
