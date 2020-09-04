import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { recoilUserState } from '../atom.js';
import { useAuth0 } from '@auth0/auth0-react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from './Loading';

const USER = gql`
  query($user_id: String) {
    user(where: { auth0_user_id: { _eq: $user_id } }) {
      id
      username
      auth0_user_id
      user_channels {
        channel_id
        channel {
          name
          messages {
            id
          }
        }
      }
    }
  }
`;

const Dashboard: React.FC = () => {
  const [userState, setUserState] = useRecoilState<any>(recoilUserState);
  const { isAuthenticated, isLoading, user } = useAuth0();
  const client = useApolloClient();

  if (isLoading) {
    return (
      <React.Fragment>
        <Loading />
      </React.Fragment>
    );
  }

  const setUser = async () => {
    const { data, errors } = await client.query({
      query: USER,
      variables: {
        user_id: user?.sub,
      },
    });

    if (errors) console.error('query error: ', errors);
    console.log('data', data);

    const userState = {
      isLoggedIn: true,
      username: data.user[0].username,
      user_id: data.user[0].auth0_user_id,
      user_channels: data.user[0].user_channels,
    };

    console.log('userState', userState);
    setUserState(userState);
  };

  if (isAuthenticated && user && !isLoading && !userState.user_id) setUser();

  return (
    <div>
      <p>Dashboard Chicken Fest Chat</p>
    </div>
  );
};

export default Dashboard;
