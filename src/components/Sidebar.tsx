import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const USER_CHANNELS = gql`
  query {
    user_channels(order_by: { channel: { id: asc } }) {
      channel_id
      user_id
      channel {
        name
      }
    }
  }
`;

const Sidebar: React.FC<any> = () => {
  const { isAuthenticated, loginWithRedirect, user, isLoading } = useAuth0();

  let { channel } = useParams();

  const { data, error, loading, client } = useQuery(USER_CHANNELS);

  return (
    <React.Fragment>
      <ul>
        {!loading && data && data.user_channels
          ? data.user_channels.map((data: any) => {
              return (
                <li>
                  <Link to={'/channel/' + data.channel.name}>
                    {data.channel.name}
                  </Link>
                </li>
              );
            })
          : ''}
      </ul>
    </React.Fragment>
  );
};

export default Sidebar;
