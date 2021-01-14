import React, { useState, useEffect } from 'react';
import { theme } from '../../theme/theme';
import { useRecoilValue } from 'recoil';
import { getPollQuestionAnswers } from '../../atom';
import {
  useWatchGetChannelsSubscription,
  useWatchChannelPollActiveStateSubscription,
  useAddPublishPollQuestionToChannelMutation,
  useDeletePollQuestionFromChannelMutation,
} from '../../api/generated/graphql';
import { Box, Chip } from '@material-ui/core';
import Loader from '../../components/shared/Loader';

interface GetChannelsProps {
  questionId: number;
  questionLocked: boolean;
}

const GetChannels: React.FC<GetChannelsProps> = ({
  questionId,
  questionLocked,
}) => {
  const [questionIdState, setQuestionIdState] = React.useState(questionId);
  const getPollQuestionId = useRecoilValue<number>(getPollQuestionAnswers);
  const [channelId] = useState<string>('');
  const { data, loading, error } = useWatchGetChannelsSubscription();
  const {
    data: checkActiveChannelState,
  } = useWatchChannelPollActiveStateSubscription({
    variables: {},
  });

  const [pollQuestionToChannel] = useAddPublishPollQuestionToChannelMutation();
  const [
    deletePollQuestionFromChannelMutation,
    { error: deleteError },
  ] = useDeletePollQuestionFromChannelMutation({
    variables: {
      pollQuestionId: getPollQuestionId,
      channelId: parseInt(channelId),
    },
  });

  useEffect(() => {
    setQuestionIdState(questionId);
  }, [questionId, questionIdState]);

  if (loading) {
    return (
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Loader />
      </Box>
    );
  }

  if (error) {
    return <p>Error loading.</p>;
  }

  const handlePublishOnChannel = async (chnId: number) => {
    await pollQuestionToChannel({
      variables: {
        channelID: chnId,
        pollQuestionID: getPollQuestionId,
      },
    });
  };

  const handleDeleteQuestionFromChannel = async (chnId: number) => {
    if (chnId === undefined) return;

    await deletePollQuestionFromChannelMutation({
      variables: {
        pollQuestionId: getPollQuestionId,
        channelId: chnId,
      },
    });

    if (deleteError) {
      console.log('error on delete question from channel');
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
        pb={1}
      >
        {data?.channel
          .sort((a, b) => a.id - b.id)
          .map((chn, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexDirection="row"
                flex={1}
              >
                <Chip
                  disabled={
                    chn.channel_polls[0]?.poll_question?.id !==
                      questionIdState &&
                    chn.channel_polls[0]?.poll_question?.id !== undefined
                      ? true
                      : false || !questionLocked
                  }
                  onClick={() => handlePublishOnChannel(chn.id)}
                  onDelete={() => {
                    handleDeleteQuestionFromChannel(chn.id);
                  }}
                  style={{
                    marginTop: theme.spacing(1),
                    marginRight: theme.spacing(1),
                    maxWidth: 150,
                  }}
                  variant="outlined"
                  size="small"
                  color={
                    chn.channel_polls[0]?.channel_id === chn.id
                      ? 'secondary'
                      : 'primary'
                  }
                  label={chn.name}
                />
                <Chip
                  variant={
                    chn.channel_polls[0]?.poll_question?.text
                      ? 'default'
                      : 'outlined'
                  }
                  color={
                    chn.channel_polls[0]?.poll_question?.text
                      ? 'secondary'
                      : 'primary'
                  }
                  label={
                    chn.channel_polls[0]?.poll_question?.text
                      ? chn.channel_polls[0]?.poll_question?.text
                      : 'No poll set.'
                  }
                  size="small"
                  style={{
                    marginTop: theme.spacing(1),
                    width: 150,
                    minWidth: 100,
                    maxWidth: 150,
                  }}
                />
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};

export default GetChannels;
