import React from 'react';
import { string, func, bool } from 'prop-types';

import InputField from './InputField';

const Input = ({ value, onChange, error, warning, success }) =>
  <InputField
    value={value}
    onChange={({ target }) => onChange(target.value)}
    error={error}
    warning={warning}
    success={success}
  />;

Input.propTypes = {
  value: string,
  onChange: func.isRequired,
  error: bool,
  warning: bool,
  success: bool,
};

export default Input;
