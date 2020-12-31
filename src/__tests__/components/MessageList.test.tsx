import React from 'react';
import MessageList from '../../components/chat/MessageList';
import { Message } from '../../interfaces/message.interface';
import { useParams } from 'react-router';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { theme } from '../../theme/theme';

const user = {
  email: 'kimi@gmail.com',
  email_verified: true,
  sub: 'auth0|5f5f7119b9bd4c006ae69306',
};

const messages: any[] = [
  {
    id: 1,
    image: null,
    text: 'first message',
    timestamp: '2020-12-31T11:07:58.245664+00:00',
    user: { username: 'kimi', auth0_user_id: 'auth0|5f5f7119b9bd4c006ae69306' },
    channel: { name: 'general' },
  },
  {
    id: 2,
    image: null,
    text: 'second message',
    timestamp: '2020-12-31T10:07:58.245664+00:00',
    user: { username: 'kimi', auth0_user_id: 'auth0|5f5f7119b9bd4c006ae69306' },
    channel: { name: 'general' },
  },
  {
    id: 3,
    image: null,
    text: 'third message',
    timestamp: '2020-12-31T09:07:58.245664+00:00',
    user: { username: 'kimi', auth0_user_id: 'auth0|5f5f7119b9bd4c006ae69306' },
    channel: { name: 'general' },
  },
];

jest.mock('react-router');
const mockedParams = useParams as jest.Mock;

jest.mock('../../components/chat/Chat', () => () => (
  <div data-testid="chat">Chat</div>
));

jest.mock('../../components/shared/Loader', () => () => (
  <div data-testid="loader">Loader...</div>
));

jest.mock('../../components/chat/DeleteMessageWrapper', () => () => (
  <div>Delete Message Wrapper...</div>
));

jest.mock('../../components/chat/threads/ThreadReply', () => () => (
  <div>ThreadReply...</div>
));

jest.mock('../../components/chat/threads/ThreadReplyIn', () => () => (
  <div>ThreadReplyIn...</div>
));

jest.mock('../../components/chat/UpdateMessage', () => () => (
  <div>UpdateMessage...</div>
));

describe('Chatapp loading', () => {
  beforeEach(() => {
    mockedParams.mockReturnValue({
      channel: 'general',
    });
  });

  it('renders MessageList', async () => {
    const { container, getByTestId, debug, getByText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <MessageList
              messages={messages as any[]}
              lastMessage={null}
              preLastMessageId={null}
              user={user}
              handleIncreaseLimit={3}
              limit={3}
            />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    debug();

    expect(getByText('first message')).toBeInTheDocument();
    expect(getByText('second message')).toBeInTheDocument();
    expect(getByText('third message')).toBeInTheDocument();
  });
});
