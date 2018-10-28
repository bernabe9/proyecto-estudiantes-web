import React, { Fragment } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { hot, setConfig } from 'react-hot-loader';

import history from 'utils/history';
import RouteFromPath from 'routes/components/RouteFromPath';
import routes from '../routes';
import theme from '../constants/theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Helmet>
        <title>Proyecto Ingles - Estudiante</title>
      </Helmet>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map((route, index) =>
            <RouteFromPath
              key={`route${index}`}
              {...route}
            />)
          }
        </Switch>
      </ConnectedRouter>
    </Fragment>
  </ThemeProvider>
);

setConfig({ logLevel: 'no-errors-please' });

export default hot(module)(App);
