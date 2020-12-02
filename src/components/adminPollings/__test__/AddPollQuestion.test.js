import React from 'react';
import AddPollQuestion from '../AddPollQuestion';
import { useAuth0 } from '@auth0/auth0-react';
import { MockedProvider } from '@apollo/client/testing';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|12345678901234',
};

jest.mock('@auth0/auth0-react');

describe('AddPollQuestion', () => {
  describe('Add valid input', () => {
    beforeEach(() => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });
    });

    it('Add question text', async () => {
      const mockOnSubmit = jest.fn();
      const { getByTestId, getByRole } = await render(
        <MockedProvider>
          <AddPollQuestion mockOnSubmit={mockOnSubmit} />
        </MockedProvider>,
      );

      await act(async () => {
        const field = getByTestId('pollquestion_title').querySelector('input');
        await fireEvent.change(field, {
          target: { value: 'To be or not to be. Thats the question' },
        });
        await fireEvent.click(getByRole('button'));
      });
    });
  });

  describe('Add invalid input', () => {
    beforeEach(() => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });
    });

    it('Return without text', async () => {
      const mockOnSubmit = jest.fn();
      const { getByTestId, getByRole } = await render(
        <MockedProvider>
          <AddPollQuestion mockOnSubmit={mockOnSubmit} />
        </MockedProvider>,
      );

      await act(async () => {
        const field = getByTestId('pollquestion_title').querySelector('input');
        await fireEvent.change(field, { target: { value: '' } });
        await fireEvent.click(getByRole('button'));
      });
    });
  });
});
