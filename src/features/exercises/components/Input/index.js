import React from 'react';
import { string, func, bool } from 'prop-types';

import InputField from './InputField';

const Input = ({ value, onChange, error }) =>
  <InputField
    value={value}
    onChange={({ target }) => onChange(target.value)}
    error={error}
  />;

Input.propTypes = {
  value: string,
  onChange: func.isRequired,
  error: bool
};

export default Input;
