import styled from 'styled-components';

import Colors from '../../utils/Colors';

const ContainerMsg = styled.div`
  padding-left: 16px;
  display: flex;
  justify-content: space-between;
  :hover {
    background-color: ${Colors.background.tertiary};
  }
  ${props => (props.isPinned ? 'max-height: 42px;' : '')}
  ${props => (props.isPinned ? 'white-space: nowrap;' : '')}
  ${props => (props.isPinned ? 'overflow: hidden;' : '')}
  ${props => (props.isPinned ? 'text-overflow: ellipsis;' : '')}
`;

const Buttons = styled.div`
  display: none;
  color: ${Colors.greys.tertiary};

  ${ContainerMsg}:hover & {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
`;

const Reply = styled.span`
  background-color: ${Colors.greys.light};
  display: block
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Wrapper = styled.div`
  width: 100%;
`;

ContainerMsg.Buttons = Buttons;
ContainerMsg.Reply = Reply;
ContainerMsg.Wrapper = Wrapper;

export default ContainerMsg;
