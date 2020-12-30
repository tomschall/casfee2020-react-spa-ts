import React from 'react';
import AddPollQuestion from '../../../components/adminPollings/AddPollQuestion';
import { useAuth0 } from '@auth0/auth0-react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { getByLabelText, getByText, waitFor } from '@testing-library/dom';

const user = {
  email: 'kimi@gmail.com',
  email_verified: true,
  sub: 'auth0|5f5f7119b9bd4c006ae69306',
};

jest.mock('@auth0/auth0-react');
const mockedUseAuth0 = useAuth0 as jest.Mock;

describe('AddPollQuestion', () => {
  describe('Add valid input', () => {
    beforeEach(() => {
      mockedUseAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });
    });

    it('Add question text', async () => {
      const mockOnSubmit = jest.fn();
      // const { getById } = await render(
      //   <MockedProvider>
      //     <AddPollQuestion mockOnSubmit={mockOnSubmit} />
      //   </MockedProvider>,
      // );

      // await act(async () => {
      //   const field = getById('title');
      //   await fireEvent.change(field, {
      //     target: { value: 'To be or not to be. Thats the question' },
      //   });
      //   await fireEvent.click(getByRole('button'));
      // });
    });

    // it('Return without text', async () => {
    //   const mockOnSubmit = jest.fn();
    //   const { getByTestId, getByRole } = await render(
    //     <MockedProvider>
    //       <AddPollQuestion mockOnSubmit={mockOnSubmit} />
    //     </MockedProvider>,
    //   );

    //   await act(async () => {
    //     const field = getByTestId('pollquestion_title').querySelector('input');
    //     await fireEvent.change(field, { target: { value: 'a' } });
    //     await fireEvent.click(getByRole('button'));
    //   });
    // });
  });
});
