const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const fetch = require('node-fetch');

const HASURA_OPERATION = `
mutation addDirectMessageChannel(
  $channel_type: channel_type_enum! = DIRECT_MESSAGE
  $name: String!
  $is_private: Boolean! = true
  $user_id1: String!
  $user_id2: String!
) {
  insert_channel(
    objects: {
      channel_type: $channel_type
      name: $name
      is_private: $is_private
      user_channels: { data: [{ user_id: $user_id1 }, { user_id: $user_id2 }] }
    }
  ) {
    affected_rows
  }
}
`;

const HASURA_CHECK = `
query getCheckIfUserHasSubscribedToChannel($user_id: String!, $dm_to_user: String!) {
  channel(
    where: {
      user_channels: {
        _and: {
          user_id: { _eq: $user_id }
          channel: {
            user_channels: {
              user_id: { _eq: $dm_to_user }
              _and: { channel: { channel_type: { _eq: DIRECT_MESSAGE } } }
            }
          }
        }
      }
    }
  ) {
    id
    name
  }
}
`;

// execute the parent operation in Hasura
const execute = async (variables) => {
  const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': 'supersecret',
    },
    body: JSON.stringify({
      query: HASURA_OPERATION,
      variables,
    }),
  });
  const data = await fetchResponse.json();
  console.log('DEBUG: ', data);
  return data;
};

const executeCheck = async (variables) => {
  const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': 'supersecret',
    },
    body: JSON.stringify({
      query: HASURA_CHECK,
      variables,
    }),
  });
  const data = await fetchResponse.json();
  console.log(
    'DEBUG CHECK: ',
    util.inspect(data.data.channel.length, false, null, true),
  );
  return data;
};

// Request Handler
app.post('/validateAndAddDirectMessageChannel', async (req, res) => {
  // get request input
  const { channel_type, name, is_private, user_id1, user_id2 } = req.body.input;

  // run some business logic

  const { data: checkData, errors: checkErrors } = await executeCheck({
    user_id: user_id1,
    dm_to_user: user_id2,
  });

  if (checkErrors) {
    return res.status(400).json(checkErrors[0]);
  }

  if (checkData && checkData.channel && checkData.channel.length >= 1) {
    console.error('Users have already subscribed');
    return res.json({ affected_rows: 0 });
  }

  console.log(
    'mutation gets executed: ',
    util.inspect(checkData.channel.length, false, null, true),
  );

  // execute the Hasura operation
  const { data, errors } = await execute({
    channel_type,
    name,
    is_private,
    user_id1,
    user_id2,
  });

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0]);
  }

  // success
  return res.json({
    ...data.insert_channel,
  });
});

app.listen(PORT);
