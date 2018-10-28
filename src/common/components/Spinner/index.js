import React from 'react';

import SpinnerWrapper from './SpinnerWrapper';
import Child from './Child';

const Spinner = () => (
  <SpinnerWrapper>
    <Child />
    <Child animationDelay="-1s" />
  </SpinnerWrapper>
);

export default Spinner;
