import gql from 'graphql-tag';

export const MESSAGE_CREATED = gql`
  subscription {
    message(order_by: { id: desc }, limit: 1) {
      id
      text
      timestamp
      user {
        username
      }
    }
  }
`;

export const ONLINE_USERS = gql`
  subscription {
    user_online(order_by: { username: asc }) {
      id
      username
    }
  }
`;
