import React from 'react';
import MessageList from '../../components/chat/MessageList';
import { Message } from '../../interfaces/message.interface';
import { useParams } from 'react-router';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { theme } from '../../theme/theme';
import moment from 'moment';

const user = {
  email: 'kimi@gmail.com',
  email_verified: true,
  sub: 'auth0|aaa',
};

const messages: Message[] = [
  {
    id: 3,
    user_id: 'auth0|aaa',
    image: null,
    text: 'third message',
    timestamp: moment().subtract(3600, 'seconds'),
    user: { username: 'kimi', auth0_user_id: 'auth0|aaa' },
    channel: { name: 'general' },
  },
  {
    id: 2,
    user_id: 'auth0|bbb',
    image: null,
    text: 'second message',
    timestamp: moment().subtract(7200, 'seconds'),
    user: {
      username: 'tomschall',
      auth0_user_id: 'auth0|bbb',
    },
    channel: { name: 'general' },
  },
  {
    id: 1,
    user_id: 'auth0|ccc',
    image: null,
    text: 'first message',
    timestamp: moment().subtract(10800, 'seconds'),
    user: {
      username: 'bruce_lee',
      auth0_user_id: 'auth0|ccc',
    },
    channel: { name: 'general' },
  },
];

const deletedMessage: Message[] = [
  {
    id: 4,
    user_id: 'auth0|ddd',
    image: null,
    text: 'fourth message',
    timestamp: moment().subtract(14400, 'seconds'),
    user: { username: 'kimi', auth0_user_id: 'auth0|aaa' },
    channel: { name: 'general' },
    deleted: true,
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

describe('MessageList', () => {
  beforeEach(() => {
    mockedParams.mockReturnValue({
      channel: 'general',
    });
  });

  it('renders MessageList component with some messages', async () => {
    const { debug, getByText, getAllByText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <MessageList
              messages={messages as Message[]}
              lastMessage={null}
              preLastMessageId={null}
              user={user}
              handleIncreaseLimit={3}
              limit={3}
              setRef={() => {}}
            />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    expect(getByText('KI')).toBeInTheDocument();
    expect(getByText('kimi')).toBeInTheDocument();
    expect(
      getByText(moment(messages[0].timestamp).fromNow()),
    ).toBeInTheDocument();
    expect(getByText('third message')).toBeInTheDocument();

    expect(getByText('TO')).toBeInTheDocument();
    expect(getByText('tomschall')).toBeInTheDocument();
    expect(
      getByText(moment(messages[1].timestamp).fromNow()),
    ).toBeInTheDocument();
    expect(getByText('second message')).toBeInTheDocument();

    expect(getByText('BR')).toBeInTheDocument();
    expect(getByText('bruce_lee')).toBeInTheDocument();
    expect(
      getByText(moment(messages[2].timestamp).fromNow()),
    ).toBeInTheDocument();
    expect(getByText('first message')).toBeInTheDocument();

    expect(getAllByText('ThreadReply...')[0]).toBeInTheDocument();
    expect(getByText('Delete Message Wrapper...')).toBeInTheDocument();
    expect(getAllByText('ThreadReplyIn...')[0]).toBeInTheDocument();

    expect(getAllByText('ThreadReply...')[1]).toBeInTheDocument();
    expect(getAllByText('ThreadReplyIn...')[1]).toBeInTheDocument();

    expect(getAllByText('ThreadReply...')[2]).toBeInTheDocument();
    expect(getAllByText('ThreadReplyIn...')[2]).toBeInTheDocument();
  });

  it('renders deleted message in MessageList component', async () => {
    const { debug, getByText, getByAltText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <MessageList
              messages={deletedMessage as Message[]}
              lastMessage={null}
              preLastMessageId={null}
              user={user}
              handleIncreaseLimit={3}
              limit={3}
              setRef={() => {}}
            />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    expect(getByText('Oh sorry it seems...')).toBeInTheDocument();
    expect(getByAltText('Message has been removed')).toBeInTheDocument();
  });
});
