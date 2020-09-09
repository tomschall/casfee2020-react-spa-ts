import gql from 'graphql-tag';

export const GET_MESSAGES = gql`
  query(
    $last_received_id: Int
    $last_received_ts: timestamptz
    $channel: String
  ) {
    channel(where: { name: { _eq: $channel } }) {
      messages(
        order_by: { timestamp: asc }
        where: {
          _and: {
            id: { _neq: $last_received_id }
            timestamp: { _gte: $last_received_ts }
          }
        }
      ) {
        id
        text
        timestamp
        user {
          username
        }
        channel {
          name
        }
      }
    }
  }
`;

export const ROOM = gql`
  query {
    channel {
      name
      id
      is_private
      owner_id
    }
  }
`;

export const USER = gql`
  query($user_id: String) {
    user(where: { auth0_user_id: { _eq: $user_id } }) {
      id
      username
      auth0_user_id
      user_channels {
        channel {
          name
          id
          is_private
        }
      }
    }
  }
`;
