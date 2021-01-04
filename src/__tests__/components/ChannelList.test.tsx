import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ChannelList from '../../components/chat/ChannelList';
import { useWatchChannelsSubscription } from '../../api/generated/graphql';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core/styles';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { theme } from '../../theme/theme';
import { act } from 'react-dom/test-utils';

jest.mock('../../api/generated/graphql');
const mockedApiCall = useWatchChannelsSubscription as jest.Mock;

jest.mock('../../components/shared/Loader', () => () => (
  <div data-testid="loader">Loader...</div>
));

jest.mock('../../components/chat/UnreadMessageCounter', () => () => (
  <div data-testid="unread-message-counter">UnreadMessageCounter</div>
));

jest.mock('@material-ui/icons/ExpandLess', () => () => <div>ExpandLess</div>);

jest.mock('@material-ui/icons/ExpandMore', () => () => <div>ExpandMore</div>);

describe('ChannelList', () => {
  beforeEach(() => {});

  it('renders ChannelList component with some channels', async () => {
    mockedApiCall.mockReturnValue({
      data: {
        channels: [
          {
            id: 1,
            is_private: false,
            name: 'general',
            owner_id: 'auth0|aaa',
          },
          {
            id: 2,
            is_private: false,
            name: 'random',
            owner_id: 'auth0|aaa',
          },
          {
            id: 3,
            is_private: false,
            name: 'bug reports',
            owner_id: 'auth0|aaa',
          },
          {
            id: 4,
            is_private: false,
            name: 'usability',
            owner_id: 'auth0|aaa',
          },
        ],
      },
      loading: false,
      error: false,
    });

    const { debug, getByText, getAllByText } = render(
      <BrowserRouter>
        <RecoilRoot>
          <MockedProvider>
            <ThemeProvider theme={theme}>
              <ChannelList />
            </ThemeProvider>
          </MockedProvider>
        </RecoilRoot>
      </BrowserRouter>,
    );

    expect(getByText('Channels')).toBeInTheDocument();
    expect(getByText('general')).toBeInTheDocument();
    expect(getByText('random')).toBeInTheDocument();
    expect(getByText('bug reports')).toBeInTheDocument();
    expect(getByText('usability')).toBeInTheDocument();
  });

  it('close channellist with click', async () => {
    mockedApiCall.mockReturnValue({
      data: {
        channels: [
          {
            id: 1,
            is_private: false,
            name: 'general',
            owner_id: 'auth0|aaa',
          },
          {
            id: 2,
            is_private: false,
            name: 'random',
            owner_id: 'auth0|aaa',
          },
          {
            id: 3,
            is_private: false,
            name: 'bug reports',
            owner_id: 'auth0|aaa',
          },
          {
            id: 4,
            is_private: false,
            name: 'usability',
            owner_id: 'auth0|aaa',
          },
        ],
      },
      loading: false,
      error: false,
    });

    const { container, debug, getByText, getByTestId, getAllByRole } = render(
      <BrowserRouter>
        <RecoilRoot>
          <MockedProvider>
            <ThemeProvider theme={theme}>
              <ChannelList />
            </ThemeProvider>
          </MockedProvider>
        </RecoilRoot>
      </BrowserRouter>,
    );

    const element = await waitFor(() => getByText('Channels'));

    fireEvent.click(element);

    // await waitFor(
    //   () => {
    //     screen.debug();
    //   },
    //   { timeout: 3000 },
    // );

    expect(getByText('ExpandMore')).toBeInTheDocument();

    fireEvent.click(element);

    expect(getByText('ExpandLess')).toBeInTheDocument();
  });
});
