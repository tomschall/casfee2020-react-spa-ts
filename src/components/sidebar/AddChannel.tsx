import React from 'react';

import { Link } from 'react-router-dom';
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

const AddChannel: React.FC<any> = () => {
  const { data, loading } = useQuery(USER_CHANNELS);

  return (
    <React.Fragment>
      <ul>
        {!loading && data && data.user_channels
          ? data.user_channels.map((data: any) => {
              return (
                <li key={data.channel_id}>
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

export default AddChannel;
