const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

const fetch = require('node-fetch');

const HASURA_DIRECT_MESSAGE_OPERATION = `
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

const HASURA_CHECK_DIRECT_MESSAGE = `
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

const HASURA_CHAT_MESSAGE_OPERATION = `
mutation addChannelUserSubscription($user_id: String!, $channel_id: Int!) {
  insert_user_channels(objects: {channel_id: $channel_id, user_id: $user_id}) {
    affected_rows
  }
}`;

const HASURA_GET_CHANNEL_TYPE = `
query getChannelType($id: Int! = 11) {
  channel(where: {id: {_eq: $id}}) {
    id
    name
    channel_type
    is_private
    owner_id
  }
}`;

// Request Handler
app.post('/validateAndAddDirectMessageChannel', async (req, res) => {
  // execute the parent operation in Hasura
  const execute = async (variables) => {
    const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'supersecret',
      },
      body: JSON.stringify({
        query: HASURA_DIRECT_MESSAGE_OPERATION,
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
        query: HASURA_CHECK_DIRECT_MESSAGE,
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

  // get request input
  const { name, user_id1, user_id2 } = req.body.input;

  // run some business logic

  const { data: checkData, errors: checkErrors } = await executeCheck({
    user_id: user_id1,
    dm_to_user: user_id2,
  });

  if (checkErrors) {
    return res.status(400).json(checkErrors[0]);
  }

  console.log('checkData: ', util.inspect(checkData, false, null, true));

  if (user_id1 === user_id2) {
    console.error('You cannot subscribe to yourself');
    return res.json({ affected_rows: 0 });
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
    channel_type: 'DIRECT_MESSAGE',
    name,
    is_private: true,
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

// Request Handler
app.post('/addChannelUser', async (req, res) => {
  // execute the parent operation in Hasura
  const execute = async (variables) => {
    const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'supersecret',
      },
      body: JSON.stringify({
        query: HASURA_CHAT_MESSAGE_OPERATION,
        variables,
      }),
    });
    const data = await fetchResponse.json();
    console.log('DEBUG: ', data);
    return data;
  };

  const getChannelInfo = async (variables) => {
    const fetchResponse = await fetch('http://localhost:8080/v1/graphql', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': 'supersecret',
      },
      body: JSON.stringify({
        query: HASURA_GET_CHANNEL_TYPE,
        variables,
      }),
    });
    const data = await fetchResponse.json();
    console.log('DEBUG getChannelType: ', data);
    return data;
  };

  // get request input
  const { user_id, channel_id } = req.body.input;

  // run some business logic

  const { data: checkData, errors: checkErrors } = await getChannelInfo({
    id: channel_id,
  });

  if (checkErrors) {
    return res.status(400).json(checkErrors[0]);
  }

  console.error('data channel: ', checkData.channel[0].channel_type);

  if (
    (checkData &&
      checkData.channel &&
      checkData.channel[0].channel_type !== 'CHAT_MESSAGE') ||
    checkData.channel[0].is_private !== true
  ) {
    if (checkData.channel[0].is_private !== true)
      console.log('you cant add users to a public channel!');
    if (checkData.channel[0].channel_type !== 'CHAT_MESSAGE')
      console.log('wrong channel type: ', checkData.channel[0].channel_type);
    return res.json({ affected_rows: 0 });
  }

  console.log('user_id', user_id);
  console.log(
    'mutation gets executed: ',
    util.inspect(checkData.channel, false, null, true),
  );

  // execute the Hasura operation
  const { data, errors } = await execute({
    user_id,
    channel_id,
  });

  // if Hasura operation errors, then throw error
  if (errors) {
    console.error(errors[0]);
    return res.json({ affected_rows: 0 });
  }

  // success
  return res.json({
    ...data.insert_user_channels,
  });
});

app.listen(PORT);
