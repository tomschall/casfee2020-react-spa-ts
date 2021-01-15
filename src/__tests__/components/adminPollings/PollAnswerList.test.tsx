import React from 'react';
import PollAnswerList from '../../../components/admin/PollAnswerList';
import { RecoilRoot } from 'recoil';
import { MockedProvider } from '@apollo/client/testing';
import { ThemeProvider } from '@material-ui/core/styles';
import { render } from '@testing-library/react';
import { theme } from '../../../theme/theme';
import {
  useWatchGetPollAnswersSubscription,
  useWatchGetPollQuestionSubscription,
  useUpdatePollAnswerTextMutation,
} from '../../../api/generated/graphql';

const pollAnswers = {
  poll_answers: [
    {
      id: 1,
      question_id: 1,
      text: 'Das fragt man sich immer!',
      votes: 1,
    },
    {
      id: 2,
      question_id: 1,
      text: 'Das weiss ich immer. Isso!',
      votes: 1,
    },
    {
      id: 3,
      question_id: 1,
      text: 'Ja, an was hat es gelegen?',
      votes: 1,
    },
  ],
};

const pollQuestion = {
  poll_question: [{ id: 1, is_active: true, text: 'An was hat es gelegen?' }],
};

jest.mock('../../../api/generated/graphql');
const mockedApiCallAnswers = useWatchGetPollAnswersSubscription as jest.Mock;
const mockedApiCallQuestion = useWatchGetPollQuestionSubscription as jest.Mock;
const mockedApiCallMutation = useUpdatePollAnswerTextMutation as jest.Mock;

jest.mock('../../../components/shared/Loader', () => () => (
  <div data-testid="loader">Loader...</div>
));

jest.mock('../../../components/admin/DeleteAnswer', () => () => (
  <div data-testid="delete_answer">Delete Answer</div>
));

describe('PollAnswerList', () => {
  beforeEach(() => {
    mockedApiCallAnswers.mockReturnValue({
      data: pollAnswers,
      loading: false,
      error: false,
    });

    mockedApiCallMutation.mockReturnValue([
      { updatePollAnswerTextMutation: jest.fn() },
    ]);
  });

  it('renders PollAnswerList component', async () => {
    mockedApiCallQuestion.mockReturnValue({
      data: pollQuestion,
      loading: false,
      error: false,
    });

    const { getByText, getAllByText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <PollAnswerList pollQuestionId={1} />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    expect(getByText('Answers to these question')).toBeInTheDocument();
    expect(getByText('Total answers: 3')).toBeInTheDocument();
    expect(getByText('Das fragt man sich immer!')).toBeInTheDocument();
    expect(getAllByText('Delete Answer')[0]).toBeInTheDocument();
    expect(getByText('Das weiss ich immer. Isso!')).toBeInTheDocument();
    expect(getAllByText('Delete Answer')[1]).toBeInTheDocument();
    expect(getByText('Ja, an was hat es gelegen?')).toBeInTheDocument();
    expect(getAllByText('Delete Answer')[2]).toBeInTheDocument();
  });

  it('renders PollAnswerList component loader', async () => {
    mockedApiCallQuestion.mockReturnValue({
      data: pollQuestion,
      loading: true,
      error: false,
    });

    const { getByText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <PollAnswerList pollQuestionId={1} />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    expect(getByText('Loader...')).toBeInTheDocument();
  });
});
