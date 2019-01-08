import { combineReducers } from 'redux';

import reducerMessages from './messages/messages.reducer';
import reducerRoom from './room/room.reducer';
import reducerTags from './tags/tags.reducer';
import reducerUser from './user/user.reducer';

const reducerRoot = combineReducers({
  messages: reducerMessages,
  room: reducerRoom,
  tags: reducerTags,
  user: reducerUser,
});

export default reducerRoot;
