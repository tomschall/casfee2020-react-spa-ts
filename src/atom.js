import { atom } from 'recoil';

export const recoilUserState = atom({
  key: 'recoilUserState',
  default: {
    isLoggedIn: false,
  },
});

export const testState = atom({
  key: 'testState',
});

export const currentChannelState = atom({
  key: 'currentChannelState',
});
