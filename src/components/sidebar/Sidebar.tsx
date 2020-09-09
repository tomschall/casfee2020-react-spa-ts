import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo';
import { useRecoilState } from 'recoil';
import { atomChannelState } from '../../atom.js';

const CHANNELS = gql`
  query {
    channel {
      id
      name
    }
  }
`;

const Sidebar: React.FC<any> = () => {
  const { data, loading, refetch } = useQuery(CHANNELS);

  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);

  return (
    <React.Fragment>
      <ul>
        {channelState
          ? channelState.map((data: any) => {
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
