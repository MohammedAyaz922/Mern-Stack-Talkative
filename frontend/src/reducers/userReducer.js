import { LOAD_USER, SET_USER, SET_SELECTED_CHAT, SET_CHATS,SET_NOTIFICATIONS } from '../actions/userActions';

const initialState = {
  user: null,
  selectedChat: [],
  chats: [],
  notifications: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_SELECTED_CHAT:
      return {
        ...state,
        selectedChat: action.payload,
      };
    case SET_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
      case SET_NOTIFICATIONS:
        return {
          ...state,
          notifications: action.payload,
        };
    default:
      return state;
  }
};

export default userReducer;
