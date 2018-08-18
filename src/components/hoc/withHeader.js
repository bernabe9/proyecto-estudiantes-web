import React, { Fragment } from 'react';

import Header from '../Header';

const withHeader = (Component) => {
  const ComponentWithHeader = props => (
    <Fragment>
      <Header />
      <Component {...props} />
    </Fragment>
  );

  return ComponentWithHeader;
};

export default withHeader;
