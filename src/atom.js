import { atom } from 'recoil';

export const messagesState = atom({
  key: 'messagesState',
  default: [],
});

export const newMessagesState = atom({
  key: 'newMessagesState',
  default: [],
});

export const recoilUserState = atom({
  key: 'recoilUserState',
  default: {
    isLoggedIn: false,
  },
});

export const refetchMessagesState = atom({
  key: 'refetchMessagesState',
});

export const atomChannelState = atom({
  key: 'atomChannelState',
});

export const actualChannelState = atom({
  key: 'actualChannelState',
});

export const atomTokenState = atom({
  key: 'atomTokenState',
});
