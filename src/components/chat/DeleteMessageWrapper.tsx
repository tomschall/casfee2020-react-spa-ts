import React from 'react';
import { useWatchChannelThreadSubscription } from '../../api/generated/graphql';
import { Alert } from '@material-ui/lab';
import DeleteMessage from './DeleteMessage';
import ReplaceMessage from './ReplaceMessage';

interface DeleteMessageWrapperProps {
  messageId: number;
}

const DeleteMessageWrapper: React.FC<DeleteMessageWrapperProps> = ({
  messageId,
}) => {
  const {
    data: channelThreadData,
    loading: channelThreadLoading,
    error: channelThreadError,
  } = useWatchChannelThreadSubscription({
    variables: {
      message_id: messageId,
    },
  });

  if (channelThreadLoading) return <React.Fragment></React.Fragment>;

  if (channelThreadError) {
    return (
      <Alert severity="error">useWatchChannelThreadSubscription Error...</Alert>
    );
  }

  if (channelThreadData?.channel_thread?.length)
    return <ReplaceMessage messageId={messageId} />;

  return <DeleteMessage messageId={messageId} />;
};

export default DeleteMessageWrapper;
