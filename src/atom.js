import { atom } from 'recoil';

export const testState = atom({
  key: 'testState',
});

export const currentChannelState = atom({
  key: 'currentChannelState',
});

export const getPollQuestionAnswers = atom({
  key: 'getPollQuestionAnswersState',
  default: 1,
});

export const giphyState = atom({
  key: 'giphyState',
});

export const deletedMessageState = atom({
  key: 'deletedMessageState',
  default: false,
});
