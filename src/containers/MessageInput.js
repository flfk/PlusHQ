// import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Btn from '../components/Btn';
import InputText from '../components/InputText';
import { getTimestamp } from '../utils/Helpers';

import { sendMessage } from '../data/messages/messages.actions';

const propTypes = {
  actionSendMessage: PropTypes.func.isRequired,
  senderName: PropTypes.string.isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  messages: state.messages,
  senderName: state.user.displayName,
});

const mapDispatchToProps = dispatch => ({
  actionSendMessage: message => dispatch(sendMessage(message)),
});

class MessageInput extends React.Component {
  state = {
    message: '',
  };

  handleChangeInput = field => event => this.setState({ [field]: event.target.value });

  handleSend = () => {
    const { message } = this.state;
    const { actionSendMessage, senderName } = this.props;
    if (message) {
      const newMessage = {
        content: message,
        senderName,
        timestamp: getTimestamp(),
      };
      actionSendMessage(newMessage);
      this.setState({ message: '' });
    }
  };

  render() {
    const { message } = this.state;

    return (
      <div>
        <InputText.Area
          placeholder="Type a message..."
          onChange={this.handleChangeInput('message')}
          value={message}
        />
        <Btn.Tertiary onClick={this.handleSend}>Send</Btn.Tertiary>
      </div>
    );
  }
}

MessageInput.propTypes = propTypes;
MessageInput.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageInput);