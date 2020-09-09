import gql from 'graphql-tag';

export const INSERT_MESSAGE = gql`
  mutation insert_message($message: message_insert_input!) {
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
  mutation($user_id: String) {
    update_user(
      _set: { last_seen: "now()" }
      where: { auth0_user_id: { _eq: $user_id } }
    ) {
      affected_rows
    }
  }
`;
