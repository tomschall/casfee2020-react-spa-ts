import React, { useEffect } from 'react';
import { Subscription, useMutation } from 'react-apollo';
import { useRecoilValue } from 'recoil';
import { recoilUserState } from '../atom';
import { ONLINE_USERS } from '../data/subscriptions';
import { USER_IS_ONLINE } from '../data/mutations';

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
  const userState = useRecoilValue<any>(recoilUserState);
  const user_id = userState.user_id;

  const [sendUserIsOnline] = useMutation(USER_IS_ONLINE, {
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
