import React, { useEffect, useRef } from 'react';
import gql from 'graphql-tag';
import moment from 'moment';
import { isObject } from 'util';
import { Message } from '../interfaces/message/message.interface';

const MESSAGE_CREATED = gql`
  subscription {
    message(order_by: { id: desc }, limit: 1) {
      id
      username
      text
      timestamp
    }
  }
`;

interface MessageProps {
  messages: Message[];
}

const MessageList: React.FC<MessageProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (isObject(messagesEndRef) && messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  useEffect(() => {
    console.log('component did mount');

    return function cleanup() {
      console.log('component did unmount');
    };
  }, []);

  useEffect(() => {
    console.log('update');
    scrollToBottom();
  });

  const renderAvatar = (user: any) => {
    let image;
    if (user === 'roli') {
      image = (
        <img
          className="avatar"
          alt="avatar"
          src="https://placeimg.com/50/50/people?1"
        />
      );
    } else {
      image = (
        <img
          className="avatar"
          alt="avatar"
          src="https://placeimg.com/50/50/people?2"
        />
      );
    }
    return image;
  };

  return (
    <div className="container">
      <div className="chat-container">
        {messages.map((m) => {
          return (
            <div key={m.id} className="message">
              {renderAvatar(m.username)}

              <div className="datetime">
                {m.username}: <i>{moment(m.timestamp).fromNow()}</i>
              </div>
              <p>{m.text}</p>
            </div>
          );
        })}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
