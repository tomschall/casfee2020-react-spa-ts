import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { getPollQuestionAnswers } from '../../atom';
import {
  useWatchGetChannelsSubscription,
  useWatchChannelPollActiveStateSubscription,
  useAddPublishPollQuestionToChannelMutation,
  useDeletePollQuestionFromChannelMutation,
} from '../../api/generated/graphql';
import { Box, Chip, Typography } from '@material-ui/core';
import Loader from '../../components/shared/Loader';

const GetChannels: React.FC = () => {
  const getPollQuestionId = useRecoilValue<number>(getPollQuestionAnswers);
  const [channelId, setChannelID] = useState<string>('');
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

  const handlePublishOnChannel = async (kanalId: number) => {
    await pollQuestionToChannel({
      variables: {
        channelID: kanalId,
        pollQuestionID: getPollQuestionId,
      },
    });
  };

  const handleDeleteQuestionFromChannel = async (kanalId: number) => {
    if (kanalId === undefined) return;

    await deletePollQuestionFromChannelMutation({
      variables: {
        pollQuestionId: getPollQuestionId,
        channelId: kanalId,
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
      >
        <Typography variant="h3">Channels with active polls:</Typography>
        <Typography variant="caption">
          Click on chip to set actual question to channel:
        </Typography>
        {data?.channel
          .sort((a, b) => a.id - b.id)
          .map((chn, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Chip
                onClick={() => handlePublishOnChannel(chn.id)}
                onDelete={() => handleDeleteQuestionFromChannel(chn.id)}
                style={{ marginTop: 8, marginRight: 8 }}
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
                style={{ marginTop: 8, marginRight: 8 }}
                size="small"
              />
            </Box>
          ))}
      </Box>
    </>
  );
};

export default GetChannels;
