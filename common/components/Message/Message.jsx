import React, { PropTypes } from 'react';
import moment from 'moment';
import style from './Message.scss';

export default function Message({ message, showModal, deleteMessage }) {
  const remove = () => {
    showModal({
      type: 'CONFIRM_REMOVE',
      resolveAction: deleteMessage,
      props: {
        target: message,
        title: `Remove "${message.text}"?`
      }
    })
  };

  const format = moment().isSame(message.created_at, 'day') ? 'HH:mm' : 'DD.MM HH:mm';
  const time = moment(message.created_at).format(format);

  return (
    <div className={style.Message}>
      <div className={style.time}>{time}</div>
      <div className={style.text}>
        {message.text}
      </div>
      <button className={style.destroy} onClick={remove} />
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  deleteMessage: PropTypes.func.isRequired
};
