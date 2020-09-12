import gql from 'graphql-tag';

export const MESSAGE_CREATED = gql`
  subscription watchNewMessages {
    newMessages: message(order_by: { id: desc }, limit: 1) {
      id
      text
      timestamp
      user {
        username
      }
    }
  }
`;

export const WATCH_MESSAGES = gql`
  subscription watchMessages(
    $channelId: Int!
  ) {
    messages: message(
      order_by: { timestamp: asc }
      where: {
        channel: {
          id: { _eq: $channelId }
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
      channel_threads {
        id
      }
    }
  }
`;

export const ONLINE_USERS = gql`
  subscription watchOnlineUsers {
    user_online(order_by: { username: asc }) {
      id
      username
    }
  }
`;
