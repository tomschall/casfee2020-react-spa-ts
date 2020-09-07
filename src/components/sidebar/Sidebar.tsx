import React from 'react';

import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';

const CHANNELS = gql`
  query {
    channel {
      id
      name
    }
  }
`;

const Sidebar: React.FC<any> = () => {
  const { data, loading } = useQuery(CHANNELS);

  return (
    <React.Fragment>
      <ul>
        {!loading && data && data.channel
          ? data.channel.map((data: any) => {
              return (
                <li key={data.id}>
                  <Link to={'/channel/' + data.name}>{data.name}</Link>
                </li>
              );
            })
          : ''}
      </ul>
    </React.Fragment>
  );
};

export default Sidebar;
