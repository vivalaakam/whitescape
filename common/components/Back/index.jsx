import React, { PropTypes } from 'react';
import style from './Back.scss';

export default function Back({ children }) {
  return (
    <div className={style.Back}>
      {children}
    </div>
  );
}

Back.propTypes = {
  children: PropTypes.element.isRequired
};
