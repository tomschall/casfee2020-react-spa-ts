import React, { useState, useEffect } from 'react';
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

const GetChannels: React.FC = () => {
  const getPollQuestionId = useRecoilValue<number>(getPollQuestionAnswers);
  const [channelId, setChannelID] = useState<string>('');
  const { data, loading, error } = useWatchGetChannelsSubscription();
  const {
    data: checkActiveChannelState,
  } = useWatchChannelPollActiveStateSubscription({
    variables: {},
  });

  useEffect(() => {}, [
    checkActiveChannelState,
    channelId,
    data,
    getPollQuestionId,
  ]);

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
    return <p>Error loading getChanngels</p>;
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
        {data?.channel
          .sort((a, b) => a.id - b.id)
          .map((chn) => (
            <Chip
              key={chn.id}
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
          ))}
      </Box>
    </>
  );
};

export default GetChannels;
