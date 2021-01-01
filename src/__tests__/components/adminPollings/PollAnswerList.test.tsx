import React from 'react';
import PollAnswerList from '../../../components/adminPollings/PollAnswerList';
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

jest.mock('../../../components/adminPollings/DeleteAnswer', () => () => (
  <div data-testid="delete_answer">Delete Answer</div>
));

describe('PollAnswerList', () => {
  beforeEach(() => {
    mockedApiCallQuestion.mockReturnValue({
      data: pollQuestion,
      loading: false,
      error: false,
    });

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
    const { debug, getByText, getAllByText } = render(
      <RecoilRoot>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <PollAnswerList pollQuestionId={1} />
          </ThemeProvider>
        </MockedProvider>
      </RecoilRoot>,
    );

    debug();

    expect(getByText('Answers to these question')).toBeInTheDocument();
    expect(getByText('Total answers: 3')).toBeInTheDocument();
    expect(getByText('Das fragt man sich immer!')).toBeInTheDocument();
    expect(getAllByText('Delete Answer')[0]).toBeInTheDocument();
    expect(getAllByText('Update')[0]).toBeInTheDocument();
    expect(getByText('Das weiss ich immer. Isso!')).toBeInTheDocument();
    expect(getAllByText('Delete Answer')[1]).toBeInTheDocument();
    expect(getAllByText('Update')[1]).toBeInTheDocument();
    expect(getByText('Ja, an was hat es gelegen?')).toBeInTheDocument();
    expect(getAllByText('Delete Answer')[2]).toBeInTheDocument();
    expect(getAllByText('Update')[2]).toBeInTheDocument();
  });
});
