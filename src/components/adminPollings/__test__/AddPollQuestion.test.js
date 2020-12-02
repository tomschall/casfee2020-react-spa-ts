import React from 'react';
import ReactDOM from 'react-dom';
import AddPollQuestion from '../AddPollQuestion';
import { useAuth0 } from '@auth0/auth0-react';
import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { waitForAll } from 'recoil';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|12345678901234',
};

jest.mock('@auth0/auth0-react');

describe('Add poll question', () => {
  describe('add valid input', () => {
    beforeEach(() => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        // logout: jest.fn(),
        // loginWithRedirect: jest.fn(),
      });
    });

    it('add question', async () => {
      const mockOnSubmit = jest.fn();
      const { getByTestId, getByRole } = await render(
        <MockedProvider>
          <AddPollQuestion mockOnSubmit={mockOnSubmit} />
        </MockedProvider>,
      );

      await act(async () => {
        const field = getByTestId('title').querySelector('input');
        fireEvent.change(field, { target: { value: 'An was hats gelegen?' } });
        fireEvent.click(getByRole('button'));
      });
    });
  });
});
