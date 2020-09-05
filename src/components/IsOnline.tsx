import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useRecoilState } from 'recoil';
import { recoilUserState } from '../atom.js';

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
