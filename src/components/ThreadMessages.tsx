import React, { useEffect } from 'react';

import gql from 'graphql-tag';
import { useRecoilState } from 'recoil';
import { testState, recoilChannelThreadMessages } from '../atom.js';

const CHANNEL_THREAD_SUBSCRIPTION = gql`
  subscription($message_id: Int) {
    channel_thread_message(
      limit: 1
      order_by: { id: desc }
      where: { channel_thread: { message_id: { _eq: $message_id } } }
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
  data,
  message_id,
}) => {
  const [channelThreadMessages, setChannelThreadMessages] = useRecoilState<any>(
    recoilChannelThreadMessages,
  );

  useEffect(() => {
    console.log('useEffect ThreadMessages');
    const unsubscribe = subscribeToMore({
      document: CHANNEL_THREAD_SUBSCRIPTION,
      variables: { message_id: message_id },
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;

        console.log('prev', prev);
        console.log('subscriptionData', subscriptionData);
        console.log('channelThreadMessages', channelThreadMessages);

        let newItem = subscriptionData.data.channel_thread_message[0];

        let lastItem = channelThreadMessages[channelThreadMessages.length - 1];
        if (lastItem.id === newItem.id) return prev;

        console.log('lastitem', lastItem);

        let obj;
        if (prev && prev.channel_thread) {
          obj = Object.assign({}, prev, {
            channel_thread: [
              {
                channel_thread_messages: [
                  ...prev.channel_thread[0].channel_thread_messages,
                  newItem,
                ],
              },
            ],
          });
        }

        console.log('obj', obj);
        setChannelThreadMessages(obj.channel_thread[0].channel_thread_messages);
        return obj;
      },
    });

    return function cleanup() {
      unsubscribe();
      console.log('component ThreadMessages did unmount');
    };
  }, [channelThreadMessages]);

  console.log('channelThreadMessages', channelThreadMessages);
  return (
    <React.Fragment>
      {channelThreadMessages && channelThreadMessages.length !== 0
        ? channelThreadMessages.map((m: any) => {
            return <p key={m.id}>{m.message}</p>;
          })
        : ''}
    </React.Fragment>
  );
};

export default ThreadMessages;
