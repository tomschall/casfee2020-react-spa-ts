import React, { useEffect } from 'react';
import { Subscription, useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useRecoilState } from 'recoil';
import { recoilUserState } from '../atom';

const ONLINE_USERS = gql`
  subscription {
    user_online(order_by: { username: asc }) {
      id
      username
    }
  }
`;

const USER_IS_ONLINE = gql`
  mutation($user_id: String) {
    update_user(
      _set: { last_seen: "now()" }
      where: { auth0_user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;

interface OnlineUserProps {
  username: string;
  user_id: string;
}

interface UserOnline {
  user_online: {
    id: number;
    username: string;
  };
}

const OnlineUser: React.FC<OnlineUserProps> = () => {
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);
  const user_id = userState.user_id;

  const [sendUserIsOnline, { data }] = useMutation(USER_IS_ONLINE, {
    variables: { user_id },
  });

  useEffect(() => {
    setInterval(() => {
      sendUserIsOnline();
    }, 2000);
  }, []);

  const subscriptionData = () => (
    <Subscription<UserOnline> subscription={ONLINE_USERS}>
      {({ data, loading, error }) => {
        if (loading) {
          return null;
        }

        if (error) {
          console.log('error Online User', error);
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
