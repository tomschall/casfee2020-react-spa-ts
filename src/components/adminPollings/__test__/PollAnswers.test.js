import React from 'react';
import PollAnswers from '../PollAnswers';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

describe('Add answer', () => {
  describe('with valid inputs', () => {
    it('And answer test -> valid input', async () => {
      // const mockAddAnswer = jest.fn();
      // const pollQuestionId = {params: {}};
      // const { getByLabelText, getByRole } = render(
      //   <PollAnswers onSubmit={mockAddAnswer} />,
      // );
    });
  });

  describe('with invalid input', () => {
    it.todo('renders invalid input');
  });
});
