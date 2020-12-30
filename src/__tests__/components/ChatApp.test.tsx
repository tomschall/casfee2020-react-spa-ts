import React from 'react';
import ReactDOM from 'react-dom';
import ChatApp from '../../components/chat/ChatApp';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { getByLabelText, getByText, waitFor } from '@testing-library/dom';
import { JsonObjectExpressionStatement } from 'typescript';

const user = {
  email: 'kimi@gmail.com',
  email_verified: true,
  sub: 'auth0|5f5f7119b9bd4c006ae69306',
};

jest.mock('@auth0/auth0-react');
const mockedUseAuth0 = useAuth0 as jest.Mock;
jest.mock('react-router');
const mockedParams = useParams as jest.Mock;

describe('Chatapp', () => {
  beforeEach(() => {
    mockedUseAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });
    mockedParams.mockReturnValue({
      channel: 'general',
    });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MockedProvider>
        <RecoilRoot>
          <ChatApp />
        </RecoilRoot>
      </MockedProvider>,
      div,
    );
  });
});
