export const LOAD_USER = 'LOAD_USER';
export const SET_USER = 'SET_USER';
export const SET_SELECTED_CHAT = 'SET_SELECTED_CHAT';
export const SET_CHATS = 'CHATS';
export const SET_NOTIFICATIONS = 'NOTIFICATIONS';

export const loadUser = () => {
  const userInfo = JSON.parse(localStorage.getItem('UserInfo'));
  return {
    type: LOAD_USER,
    payload: userInfo,
  };
};

export const setUser = (user) => {
  localStorage.setItem('userInfo', JSON.stringify(user));
  return {
    type: SET_USER,
    payload: user,
  };
};

export const setSelectedChat = (chat) => {
  return {
    type: SET_SELECTED_CHAT,
    payload: chat,
  };
};

export const setChats = (chat) => {
  return {
    type: SET_CHATS,
    payload: chat,
  };
};

export const setNotifications = (chat) => {
  return {
    type: SET_NOTIFICATIONS,
    payload: chat,
  };
};

