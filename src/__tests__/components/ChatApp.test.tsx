import React from 'react';
import ChatApp from '../../components/chat/ChatApp';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { theme } from '../../theme/theme';
import {
  useGetChannelByNameQuery,
  Channel_Type_Enum,
} from '../../api/generated/graphql';

const user = {
  email: 'kimi@gmail.com',
  email_verified: true,
  sub: 'auth0|5f5f7119b9bd4c006ae69306',
};

jest.mock('@auth0/auth0-react');
const mockedUseAuth0 = useAuth0 as jest.Mock;
jest.mock('react-router');
const mockedParams = useParams as jest.Mock;
jest.mock('../../api/generated/graphql');
const mockedApiCall = useGetChannelByNameQuery as jest.Mock;
jest.mock('../../components/chat/Chat', () => () => (
  <div data-testid="chat">Chat</div>
));
jest.mock('../../components/shared/Loader', () => () => (
  <div data-testid="loader">Loader...</div>
));

describe('Chatapp loading', () => {
  beforeEach(() => {
    mockedParams.mockReturnValue({
      channel: 'general',
    });
  });

  it('renders Chat', async () => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      error: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    mockedApiCall.mockReturnValue({
      data: {
        channel: [
          {
            channel_type: Channel_Type_Enum.ChatMessage,
            id: 1,
            is_private: false,
            name: 'general',
            owner_id: 'admin',
            __typename: 'channel',
          },
        ],
      },
      loading: false,
      error: false,
    });

    const { debug, getByText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <ChatApp />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    expect(getByText('Chat')).toBeInTheDocument();
  });

  it('renders Loader', async () => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: true,
      error: false,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    mockedApiCall.mockReturnValue({
      data: {
        channel: [
          {
            channel_type: Channel_Type_Enum.ChatMessage,
            id: 1,
            is_private: false,
            name: 'general',
            owner_id: 'admin',
            __typename: 'channel',
          },
        ],
      },
      loading: false,
      error: false,
    });

    const { container, getByTestId, debug, getByText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <ChatApp />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    expect(getByText('Loader...')).toBeInTheDocument();
  });

  it('renders Error', async () => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      error: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    mockedApiCall.mockReturnValue({
      data: {
        channel: [
          {
            channel_type: Channel_Type_Enum.ChatMessage,
            id: 1,
            is_private: false,
            name: 'general',
            owner_id: 'admin',
            __typename: 'channel',
          },
        ],
      },
      loading: false,
      error: true,
    });

    const { debug, getByText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <ChatApp />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    expect(getByText('Error:')).toBeInTheDocument();
  });
});
