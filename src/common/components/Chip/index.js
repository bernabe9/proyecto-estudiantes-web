import React from 'react';
import { string } from 'prop-types';

import Wrapper from './Wrapper';
import Label from './Label';

const Chip = ({ children }) =>
  <Wrapper>
    <Label>{children}</Label>
  </Wrapper>;

Chip.propTypes = {
  children: string.isRequired,
};

export default Chip;
