import { CREATE_ROOM, LOAD_ROOM, TOGGLE_INVITE_MEMBER, UPDATE_ROOM } from './room.types';
import { CANCEL_REPLY, REPLY_TO_MESSAGE } from '../messages/messages.types';
import { LOAD_MEMBERS } from '../members/members.types';

const initialState = {
  error: false,
  id: '',
  isLoading: true,
  isLoadingMembers: true,
  members: {
    default: { isOnline: false, isTyping: false, mostRecentSignOut: 0 },
  },
  msgIdBeingRepliedTo: '',
  name: '',
  pathname: '',
  isInvitingMember: false,
};

const reducerRoom = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM.PENDING:
      return { ...state, isLoading: true };
    case CREATE_ROOM.SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    case CANCEL_REPLY.SUCCESS:
      return { ...state, msgIdBeingRepliedTo: '' };
    case TOGGLE_INVITE_MEMBER.SUCCESS:
      return { ...state, isInvitingMember: !state.isInvitingMember };
    case LOAD_MEMBERS.SUCCESS:
      return { ...state, isLoadingMembers: false };
    case LOAD_ROOM.PENDING:
      return { ...state, isLoading: true };
    case LOAD_ROOM.SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    case LOAD_ROOM.ERROR:
      return { ...state, error: true, isLoading: false };
    case REPLY_TO_MESSAGE.SUCCESS:
      return { ...state, msgIdBeingRepliedTo: action.payload };
    case UPDATE_ROOM.SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducerRoom;
