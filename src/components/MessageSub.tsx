import React, { useEffect } from 'react';
import { MESSAGE_CREATED } from '../data/subscriptions';

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
        console.log('refetch');

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
