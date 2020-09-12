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
    $limit: Int = 20
  ) {
    messages: message(
      order_by: { timestamp: desc }
      limit: $limit,
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
    users: user_online(order_by: { username: asc }) {
      id
      username
    }
  }
`;

export const WATCH_CHANNELS = gql`
  subscription watchChannels {
    channels: channel {
      name
      id
      is_private
      owner_id
    }
  }
`;
