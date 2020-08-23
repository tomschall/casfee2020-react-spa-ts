import React, { useEffect } from 'react';
import gql from 'graphql-tag';

const MESSAGE_CREATED = gql`
  subscription {
    message(order_by: { id: desc }, limit: 1) {
      id
      username
      text
      timestamp
    }
  }
`;

interface MessageSubProps {
  subscribeToMore: any;
  refetch: any;
  username: string;
}

const MessageSub: React.FC<MessageSubProps> = ({
  subscribeToMore,
  refetch,
  username,
}) => {
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_CREATED,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (subscriptionData.data.message[0].username !== username) refetch();

        return null;
      },
    });

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return null;
};

export default MessageSub;
