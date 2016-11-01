import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './Checkbox.scss';
import guid from '../../../helpers/guid';

export default function Checkbox({ children, onChange, checked = false, name = '', disabled = false }) {
  const className = classnames(style.Checkbox, {
    [style.checked]: checked,
    [style.disabled]: disabled
  });
  const id = guid();
  return (
    <label className={className} htmlFor={id}>
      <span className={style.wrapper}>
        <input
          className={style.input}
          type="checkbox"
          name={name}
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
      </span>
      <span className={style.text}>{children}</span>
    </label>
  );
}

Checkbox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element
  ]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
};
