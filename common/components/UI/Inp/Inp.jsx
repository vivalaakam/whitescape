import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './Inp.scss';

export default function Inp({
  onChange, onBlur, onKeyDown, value, link,
  placeholder = '', type = 'text', className = ''
}) {
  return (
    <input
      className={classnames(style.Inp, className)}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      value={value}
      placeholder={placeholder}
      ref={c => (link(c))}
      type={type}
    />
  );
}

Inp.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  link: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string
};
