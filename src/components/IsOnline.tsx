import React, { useEffect } from 'react';
import { useMutation } from 'react-apollo';
import { useRecoilState } from 'recoil';
import { recoilUserState } from '../atom.js';
import { USER_IS_ONLINE } from '../data/mutations';

const IsOnline: React.FC<any> = () => {
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

  return null;
};

export default IsOnline;
