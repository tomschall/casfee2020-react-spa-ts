import { atom } from 'recoil';

export const messagesState = atom({
  key: 'messagesState',
  default: [],
});

export const newMessagesState = atom({
  key: 'newMessagesState',
  default: [],
});

export const userState = atom({
  key: 'userState',
  default: {
    isLoggedIn: false,
  },
});

export const refetchMessagesState = atom({
  key: 'refetchMessagesState',
});
