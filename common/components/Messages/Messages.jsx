import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Message from '../Message/Message';
import style from './Messages.scss';

export default class Messages extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    list: PropTypes.array.isRequired,
    form: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  setMessage() {
    this.props.actions.setMessage(this.refMessage.value);
  }

  submit(e) {
    e.preventDefault();
    const { disabled, message } = this.props.form;
    if (!disabled && message.length) {
      this.props.actions.createMessage({ text: message });
    }
  }

  loadMore() {
    this.props.actions.fetchMessages();
  }

  renderList() {
    return this.props.list.map((message, i) => (<Message message={message} key={i} />));
  }

  renderLoadMore() {
    if (this.props.params.loadMore) {
      return (<button onClick={::this.loadMore}>Load more</button>);
    }
    return null;
  }

  render() {
    const message = classnames(style.message, {
      [style.disabled]: this.props.form.disabled
    });

    return (
      <div className={style.Messages}>
        <div className={message}>
          <textarea
            value={this.props.form.message}
            ref={c => (this.refMessage = c)}
            onChange={::this.setMessage}
          />
          <span className={style.counter}>{this.props.form.message.length}</span>
          <button className={style.send} onClick={::this.submit} />
        </div>
        <div className={style.list}>
          {this.renderList()}
        </div>
        <div className={style.loadMore}>
          {this.renderLoadMore()}
        </div>
      </div>
    );
  }
}
