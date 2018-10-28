import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from 'constants/theme';

export const withStore = (WrappedComponent, store) => (
  <MemoryRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {WrappedComponent}
      </Provider>
    </ThemeProvider>
  </MemoryRouter>
);
