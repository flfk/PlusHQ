// import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Scrollable from '../components/Scrollable';
import { TagHeader, TagItem, TagPreview, Wrapper } from '../components/tagPanel';
import { toggleTag } from '../data/tags/tags.actions';

const propTypes = {
  actionToggleTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isSelected: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

const defaultProps = {};

const mapStateToProps = state => ({
  tags: state.tags,
});

const mapDispatchToProps = dispatch => ({
  actionToggleTag: tagName => dispatch(toggleTag(tagName)),
});

class TagPanel extends React.Component {
  state = {};

  handleToggleTag = event => {
    console.log('handling toggle tag', event.target.value);
    const { actionToggleTag } = this.props;
    actionToggleTag(event.target.value);
  };

  render() {
    const { tags } = this.props;

    const hasTagsSelected = tags.filter(tag => tag.isSelected).length > 0;

    const tagsList = tags.map(tag => (
      <TagItem key={tag.name} onClick={this.handleToggleTag} value={tag.name}>
        <TagHeader isSelected={hasTagsSelected ? tag.isSelected : true}>{tag.name}</TagHeader>
        <TagPreview>preview</TagPreview>
      </TagItem>
    ));

    return (
      <Wrapper>
        <Scrollable>{tagsList}</Scrollable>
      </Wrapper>
    );
  }
}

TagPanel.propTypes = propTypes;
TagPanel.defaultProps = defaultProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagPanel);
