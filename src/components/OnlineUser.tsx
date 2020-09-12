import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { recoilUserState } from '../atom';
import { useSetUserOnlineMutation } from '../api/generated/graphql';

interface OnlineUserProps {
  username: string;
  user_id: string;
}

const OnlineUser: React.FC<OnlineUserProps> = () => {
  const userState = useRecoilValue<any>(recoilUserState);
  const user_id = userState.user_id;

  const [sendUserIsOnline] = useSetUserOnlineMutation({
    variables: { user_id },
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      sendUserIsOnline();
    }, 9000);
  }, []);

  return <></>;
};

export default OnlineUser;
