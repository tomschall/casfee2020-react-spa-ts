import React from 'react';
import { useRecoilState } from 'recoil';
import { recoilUserState } from '../atom.js';
import { useAuth0 } from '@auth0/auth0-react';
import gql from 'graphql-tag';

const Dashboard: React.FC = () => {
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);
  const { isAuthenticated, isLoading, user } = useAuth0();

  console.log('user', user);

  return (
    <div>
      <p>Dashboard Chicken Fest Chat: {user.nickname}</p>
    </div>
  );
};

export default Dashboard;
