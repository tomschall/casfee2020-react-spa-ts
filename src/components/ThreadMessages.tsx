import React, { useEffect } from 'react';

import gql from 'graphql-tag';
import { useRecoilState } from 'recoil';
import { testState, recoilChannelThreadMessages } from '../atom.js';

// const CHANNEL_THREAD_SUBSCRIPTION = gql`
//   subscription($message_id: Int) {
//     channel_thread_message(
//       order_by: { id: desc }
//       where: { channel_thread: { message_id: { _eq: $message_id } } }
//     ) {
//       id
//       message
//       user {
//         id
//         username
//       }
//     }
//   }
// `;
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
    console.log('useEffect ThreadMessages');

    const unsubscribe = subscribeToMore({
      document: CHANNEL_THREAD_SUBSCRIPTION,
      variables: {
        message_id: message_id,
        id: sessionStorage.getItem('thread_message_last_id'),
      },
      updateQuery: (prev: any, { subscriptionData }: any) => {
        console.log(
          'session storage id updateQuery before',
          sessionStorage.getItem('thread_message_last_id'),
        );
        console.log('updateQuery');
        if (!subscriptionData.data.channel_thread_message[0]) return prev;
        sessionStorage.setItem(
          'thread_message_last_id',
          subscriptionData.data.channel_thread_message[
            subscriptionData.data.channel_thread_message.length - 1
          ].id,
        );
        console.log(
          'session storage id updateQuery after',
          sessionStorage.getItem('thread_message_last_id'),
        );

        console.log('prev', prev);
        console.log('subscriptionData', subscriptionData);

        let obj;

        obj = Object.assign({}, prev, {
          channel_thread: [
            {
              channel_thread_messages: [
                ...prev.channel_thread[0].channel_thread_messages,
                ...subscriptionData.data.channel_thread_message,
              ],
            },
          ],
        });

        console.log('obj', obj);
        //sessionStorage.setItem('thread_message_last_id');

        return obj;
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
