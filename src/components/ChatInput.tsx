import React, { useState, FormEvent } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { useRecoilState } from 'recoil';
import { messagesState, newMessagesState } from '../atom.js';
import '../App.css';
import { Message } from '../interfaces/message/message.interface.js';

const INSERT_MESSAGE = gql`
  mutation insert_message($message: message_insert_input!) {
    insert_message(objects: [$message]) {
      returning {
        id
        timestamp
        text
        username
      }
    }
  }
`;

interface ChatInputProps {
  username: string;
  userId: number;
}

const ChatInput: React.FC<ChatInputProps> = (props) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useRecoilState<any>(messagesState);
  const [newMessages, setNewMessages] = useRecoilState<any>(newMessagesState);

  const handleTyping = (text: any) => {
    setText(text);
  };

  const form = (sendMessage: (e: React.SyntheticEvent) => void) => {
    return (
      <form onSubmit={sendMessage}>
        <div>
          <input
            value={text}
            autoFocus={true}
            onChange={(e) => {
              handleTyping(e.target.value);
            }}
            autoComplete="off"
            placeholder="Chicken Fest"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </form>
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
          username: props.username,
          text: text,
        },
      }}
      update={(data: any, insert_message: any) => {
        const message = {
          id: insert_message.data.insert_message.returning[0].id,
          timestamp: insert_message.data.insert_message.returning[0].timestamp,
          username: insert_message.data.insert_message.returning[0].username,
          text: insert_message.data.insert_message.returning[0].text,
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
