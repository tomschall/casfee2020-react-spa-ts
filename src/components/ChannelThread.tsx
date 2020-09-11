import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useRecoilState } from 'recoil';
import { testState, recoilChannelThreadMessages } from '../atom.js';

import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import ThreadMessages from './ThreadMessages';

const CHANNEL_THREAD = gql`
  query($message_id: Int) {
    channel_thread(
      where: { message_id: { _eq: $message_id } }
      order_by: { message: {} }
    ) {
      channel_thread_messages(order_by: { id: asc }) {
        id
        message
        user {
          username
          id
        }
      }
    }
  }
`;

const CHANNEL_THREAD_SUBSCRIPTION = gql`
  subscription {
    channel_thread_message(limit: 1, order_by: { id: desc }) {
      id
      message
      user {
        id
        username
      }
    }
  }
`;

const ChannelThread: React.FC = (props) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [recoilTestState, setTestState] = useRecoilState<any>(testState);
  const [channelThreadMessages, setChannelThreadMessages] = useRecoilState<any>(
    recoilChannelThreadMessages,
  );

  console.log('recoilTestState', recoilTestState);

  useEffect(() => {
    console.log('component ChannelThread did mount');

    return function cleanup() {
      console.log('component ChannelThread did unmount');

      setTestState(null);
    };
  }, []);

  const { subscribeToMore, data, loading } = useQuery(CHANNEL_THREAD, {
    variables: { message_id: recoilTestState },
  });

  if (loading) return <React.Fragment></React.Fragment>;

  console.log('data ChannelThread', data);

  return (
    <ThreadMessages
      data={data}
      subscribeToMore={subscribeToMore}
      message_id={recoilTestState}
    />
  );
};

export default ChannelThread;
