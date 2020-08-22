import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

const ONLINE_USERS = gql`
  subscription {
    user_online(order_by: { username: asc }) {
      id
      username
    }
  }
`;

interface OnlineUserProps {
  username: string;
  userId: number;
}

interface UserOnline {
  user_online: {
    id: number;
    username: string;
  };
}

const OnlineUser: React.FC<OnlineUserProps> = () => {
  const subscriptionData = () => (
    <Subscription<UserOnline> subscription={ONLINE_USERS}>
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

export default OnlineUser;
