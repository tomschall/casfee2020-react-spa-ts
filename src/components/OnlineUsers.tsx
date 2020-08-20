import React from 'react';
import { Subscription, SubscriptionResult } from 'react-apollo';
import gql from 'graphql-tag';

const ONLINE_USERS = gql`
  subscription {
    user_online(order_by: { username: asc }) {
      id
      username
    }
  }
`;

interface OnlineUsersProps {
  username: string;
  userId: number;
}

interface UserOnline {
  user_online: {
    id: number;
    username: string;
  };
}

const OnlineUsers: React.FC<OnlineUsersProps> = () => {
  const subscriptionData = () => (
    <Subscription<UserOnline, any> subscription={ONLINE_USERS}>
      {({ data, loading }) => {
        if (loading) {
          return null;
        }

        return (
          <div>
            <p>
              Online Users (
              {data?.user_online instanceof Array ? data.user_online.length : 0}
              )
            </p>
            <ul>
              {data?.user_online instanceof Array
                ? data.user_online.map((u) => {
                    return <li key={u.id}>{u.username}</li>;
                  })
                : null}
            </ul>
          </div>
        );
      }}
    </Subscription>
  );

  return (
    <div>
      <div>{subscriptionData()}</div>
    </div>
  );
};

export default OnlineUsers;
