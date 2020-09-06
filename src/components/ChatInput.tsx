import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useRecoilState } from 'recoil';
import { messagesState, newMessagesState, atomChannelState } from '../atom.js';
import '../App.css';
import { Message } from '../interfaces/message/message.interface.js';
import { useParams } from 'react-router';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  messageInput: {
    backgroundColor: 'transparent',
    marginTop: theme.spacing(0),
    width: '90%',
  },
}));

const INSERT_MESSAGE = gql`
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

interface ChatInputProps {
  username: string;
  user_id: string;
}

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useRecoilState<any>(messagesState);
  const [newMessages, setNewMessages] = useRecoilState<any>(newMessagesState);
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);
  const classes = useStyles();

  let { channel } = useParams();
  const chanObj = channelState.filter((c: any) => c.name === channel);

  const handleTyping = (text: string) => {
    setText(text);
  };

  const form = (sendMessage: (e: React.SyntheticEvent) => void) => {
    return (
      <>
        <form onSubmit={sendMessage} noValidate autoComplete="off">
          <Grid item direction="row">
            <TextField
              className={classes.messageInput}
              value={text}
              autoFocus={true}
              onChange={(e) => {
                handleTyping(e.target.value);
              }}
              autoComplete="off"
              placeholder="Chicken Fest"
              id="standard-basic"
              label="Message"
              variant="outlined"
            />
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={sendMessage}
            >
              Send
            </Button>
          </Grid>
        </form>
      </>
    );
  };

  const updateMessages = (message: Message) => {
    const messagesArr = [...messages, ...newMessages];
    messagesArr.push(message);
    setMessages(messagesArr);
    setNewMessages([]);
  };

  return (
    <Mutation
      mutation={INSERT_MESSAGE}
      variables={{
        message: {
          user_id: props.user_id,
          text: text,
          channel_id: chanObj[0]?.id,
        },
      }}
      update={(data: any, insert_message: any) => {
        const message = {
          id: insert_message.data.insert_message.returning[0].id,
          timestamp: insert_message.data.insert_message.returning[0].timestamp,
          text: insert_message.data.insert_message.returning[0].text,
          user: insert_message.data.insert_message.returning[0].user,
          user_id: insert_message.data.insert_message.returning[0].user_id,
          channel: insert_message.data.insert_message.returning[0].channel,
        };
        updateMessages(message);
      }}
    >
      {(insert_message: any, { data, loading, error }: any) => {
        const sendMessage = (e: React.SyntheticEvent) => {
          e.preventDefault();
          if (text === '') {
            return;
          }
          insert_message();
          setText('');
        };
        return form(sendMessage);
      }}
    </Mutation>
  );
};

export default ChatInput;
