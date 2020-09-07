import React, { useEffect } from 'react';
import gql from 'graphql-tag';

const MESSAGE_CREATED = gql`
  subscription {
    message(order_by: { id: desc }, limit: 1) {
      id
      text
      timestamp
      user {
        username
      }
    }
  }
`;

interface MessageSubProps {
  subscribeToMore: any;
  refetchData: any;
}

const MessageSub: React.FC<MessageSubProps> = ({
  subscribeToMore,
  refetchData,
}) => {
  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGE_CREATED,
      updateQuery: (prev: any, { subscriptionData }: any) => {
        refetchData();

        return null;
      },
    });

    return function cleanup() {
      unsubscribe();
    };
  }, [refetchData, subscribeToMore]);

  return null;
};

export default MessageSub;
