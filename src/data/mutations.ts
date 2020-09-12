import gql from 'graphql-tag';

export const INSERT_MESSAGE = gql`
  mutation insertMessage($message: message_insert_input!) {
    insert_message(objects: [$message]) {
      returning {
        id
        timestamp
        text
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

export const USER_IS_ONLINE = gql`
  mutation setUserOnline($user_id: String) {
    update_user(
      _set: { last_seen: "now()" }
      where: { auth0_user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;

export const ADD_CHANNEL = gql`
  mutation addChannel($name: String, $owner_id: String, $is_private: Boolean) {
    insert_channel(
      objects: { name: $name, owner_id: $owner_id, is_private: $is_private }
    ) {
      returning {
        id
        name
        owner_id
        is_private
      }
    }
  }
`;
