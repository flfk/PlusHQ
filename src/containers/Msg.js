// import mixpanel from 'mixpanel-browser';
import axios from 'axios';
import Emojify from 'react-emojione';
import React from 'react';
import { connect } from 'react-redux';
import { FaFileDownload, FaEdit, FaReply } from 'react-icons/fa';
import { TiPinOutline, TiPin } from 'react-icons/ti';
import Linkify from 'react-linkify';
import reactStringReplace from 'react-string-replace';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import Colors from '../utils/Colors';
import Content from '../components/Content';
import { REGEX_TAG, REGEX_TIMER } from '../utils/Constants';
import Fonts from '../utils/Fonts';
import {
  Btn,
  ContainerMsg,
  Countdown,
  DownloadIcon,
  ImgPreview,
  ProfileImg,
  Text,
} from '../components/message';
import { replyToMsg } from '../data/messages/messages.actions';

const propTypes = {
  actionReplyToMsg: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  downloadURL: PropTypes.string,
  fileName: PropTypes.string,
  id: PropTypes.string.isRequired,
  isPinned: PropTypes.bool,
  hasAttachment: PropTypes.bool,
  hasHeader: PropTypes.bool.isRequired,
  hasTimer: PropTypes.bool,
  handleEdit: PropTypes.func.isRequired,
  handleTogglePin: PropTypes.func.isRequired,
  msgBeingRepliedTo: PropTypes.string,
  senderBeingRepliedTo: PropTypes.string,
  senderUserId: PropTypes.string.isRequired,
  profileImgURL: PropTypes.string.isRequired,
  selectTag: PropTypes.func.isRequired,
  senderName: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  type: PropTypes.string,
  userID: PropTypes.string.isRequired,
};

const defaultProps = {
  downloadURL: '',
  fileName: '',
  hasTimer: false,
  hasAttachment: false,
  isPinned: false,
  msgBeingRepliedTo: '',
  senderBeingRepliedTo: '',
  type: '',
};

const mapStateToProps = state => ({
  userID: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  actionReplyToMsg: msgId => dispatch(replyToMsg(msgId)),
});

class Msg extends React.Component {
  state = {};

  getAttachmentJSX = () => {
    const { downloadURL, fileName, type } = this.props;
    const isImg = type.indexOf('image/') > -1;
    if (isImg) {
      return (
        <a href={downloadURL} target="_blank">
          <ImgPreview src={downloadURL} />
        </a>
      );
    }
    return (
      <Text.Attachment onClick={this.handleDownload}>
        <DownloadIcon>
          <FaFileDownload />
        </DownloadIcon>{' '}
        {fileName}
      </Text.Attachment>
    );
  };

  getTag = word => {
    const { timestamp, selectTag } = this.props;
    const wordTagged = reactStringReplace(word, REGEX_TAG, match => (
      <Text.Tag key={`${timestamp}_${match}`} isSelected={false} onClick={selectTag(match)}>
        {match}{' '}
      </Text.Tag>
    ));
    return wordTagged;
  };

  getTimer = word => {
    // note input for timer must be +timer(days:hrs:mins);
    const { timestamp } = this.props;
    const regExTime = /\d+:\d+:\d+/gi;
    const input = word.match(regExTime)[0].split(':');
    const momentTo = moment(timestamp)
      .add({ days: input[0], hours: input[1], minutes: input[2] })
      .valueOf();
    return <Countdown key={`${timestamp}_${word}`} date={momentTo} />;
  };

  getTextWithTags = text => {
    const { hasTimer } = this.props;
    const words = text.split(' ').map(word => {
      if (hasTimer) {
        const isTimer = word.match(REGEX_TIMER) !== null;
        if (isTimer) return this.getTimer(word);
      }
      if (word.match(REGEX_TAG) !== null) return this.getTag(word);
      return `${word} `;
    });

    return (
      <Linkify properties={{ target: '_blank', style: { color: Colors.primary.blue } }}>
        <Emojify style={{ height: 16, width: 16 }}>{words}</Emojify>
      </Linkify>
    );
  };

  handleDownload = () => {
    const { downloadURL, fileName } = this.props;
    axios({
      url: downloadURL,
      method: 'GET',
      responseType: 'blob', // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
  };

  render() {
    const {
      actionReplyToMsg,
      content,
      fileName,
      hasAttachment,
      id,
      isPinned,
      hasHeader,
      handleEdit,
      handleTogglePin,
      msgBeingRepliedTo,
      senderBeingRepliedTo,
      senderUserId,
      profileImgURL,
      senderName,
      timestamp,
      type,
      userID,
    } = this.props;

    const profileImg = hasHeader ? <ProfileImg src={profileImgURL} /> : null;

    const header = hasHeader ? (
      <Fonts.Label isSupporting>
        {senderName} <Text.Timestamp>{moment(timestamp).format('h:mm a')}</Text.Timestamp>
      </Fonts.Label>
    ) : null;

    const text = hasAttachment ? (
      <div>
        {this.getAttachmentJSX()}
        <br />
        <Text.Message hasAttachment>{this.getTextWithTags(content)}</Text.Message>
      </div>
    ) : (
      <Text.Message>{this.getTextWithTags(content)}</Text.Message>
    );

    const spacing = hasHeader && !isPinned ? <Content.Spacing /> : <Content.Spacing8px />;

    const replyPreview = msgBeingRepliedTo ? (
      <ContainerMsg.Reply>
        <Text.Reply>{`${senderBeingRepliedTo}: ${msgBeingRepliedTo}`}</Text.Reply>
      </ContainerMsg.Reply>
    ) : null;
    return (
      <ContainerMsg.Wrapper>
        {spacing}
        <ContainerMsg isPinned={isPinned} wasSentByUser={senderUserId === userID}>
          {profileImg}
          <Text.Wrapper hasProfileImg={hasHeader} wasSentByUser={senderUserId === userID}>
            {header}
            {replyPreview}
            {text}
          </Text.Wrapper>
          <ContainerMsg.Buttons wasSentByUser={senderUserId === userID}>
            <Btn onClick={() => handleTogglePin(id)}>
              <TiPin />
            </Btn>
            <Btn onClick={() => handleEdit(id)}>
              <FaEdit />
            </Btn>
            <Btn onClick={() => actionReplyToMsg(id)}>
              <FaReply />
            </Btn>
          </ContainerMsg.Buttons>
        </ContainerMsg>
      </ContainerMsg.Wrapper>
    );
  }
}

Msg.propTypes = propTypes;
Msg.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Msg);
