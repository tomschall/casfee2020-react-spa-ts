import React, { useEffect } from 'react';
import gql from 'graphql-tag';

const CHANNEL_THREAD_SUBSCRIPTION = gql`
  subscription($message_id: Int, $id: Int) {
    channel_thread_message(
      order_by: { id: asc }
      where: {
        _and: { id: { _gt: $id } }
        channel_thread: { message_id: { _eq: $message_id } }
      }
    ) {
      id
      message
      user {
        id
        username
      }
    }
  }
`;

export interface ThreadMessagesProps {
  subscribeToMore: any;
  data: any;
  message_id: number;
}

const ThreadMessages: React.SFC<ThreadMessagesProps> = ({
  subscribeToMore,
  message_id,
  data,
}) => {
  useEffect(() => {
    console.log('component ThreadMessages did mount');
    const unsubscribe = subscribeToMore({
      document: CHANNEL_THREAD_SUBSCRIPTION,
      variables: {
        message_id: message_id,
        id: sessionStorage.getItem('thread_message_last_id'),
      },
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data.channel_thread_message[0]) return prev;
        sessionStorage.setItem(
          'thread_message_last_id',
          subscriptionData.data.channel_thread_message[
            subscriptionData.data.channel_thread_message.length - 1
          ].id,
        );

        return Object.assign({}, prev, {
          channel_thread: [
            {
              channel_thread_messages: [
                ...prev.channel_thread[0].channel_thread_messages,
                ...subscriptionData.data.channel_thread_message,
              ],
            },
          ],
        });
      },
    });

    return function cleanup() {
      unsubscribe();
      console.log('component ThreadMessages did unmount');
    };
  }, [sessionStorage.getItem('thread_message_last_id')]);

  if (
    !sessionStorage.getItem('thread_message_last_id') &&
    data &&
    data.channel_thread &&
    data.channel_thread[0] &&
    data.channel_thread[0].channel_thread_messages.length !== 0
  ) {
    sessionStorage.setItem(
      'thread_message_last_id',
      data.channel_thread[0].channel_thread_messages[
        data.channel_thread[0].channel_thread_messages.length - 1
      ].id,
    );
    console.log(
      'session storage save init id',
      sessionStorage.getItem('thread_message_last_id'),
    );
  }

  console.log('Thread Messages data ', data);

  return (
    <React.Fragment>
      {data && data.channel_thread && data.channel_thread[0]
        ? data.channel_thread[0].channel_thread_messages.map((m: any) => {
            return <p key={m.id}>{m.message}</p>;
          })
        : ''}
    </React.Fragment>
  );
};

export default ThreadMessages;
