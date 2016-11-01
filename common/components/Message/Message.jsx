import React, { PropTypes } from 'react';
import style from './Message.scss';

export default function Message({ message }) {
  return (
    <div className={style.Message}>
      <div className={style.text}>
        {message.text}
      </div>
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired
};
