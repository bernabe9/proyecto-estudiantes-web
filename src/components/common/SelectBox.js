import React from 'react';
import { string, array, func, bool } from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import cn from 'classnames';

const SelectBox = ({ value, options, onChange, success, error = false }) => {
  const className = cn({ 'select--success': success });

  return (
    <FormControl className={className} error={error}>
      <Select
        value={value}
        style={{ margin: '0 10px', minWidth: '90px', height: '28px' }}
        onChange={value => onChange(value.target.value)}
      >
        {options.map((option, index) =>
          <MenuItem key={index} value={option}>
            <em>{option}</em>
          </MenuItem>)
        }
      </Select>
    </FormControl>
  );
};

SelectBox.propTypes = {
  value: string.isRequired,
  options: array.isRequired,
  onChange: func.isRequired,
  success: bool,
  error: bool
};

export default SelectBox;
