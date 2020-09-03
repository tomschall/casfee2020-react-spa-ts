import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { isObject } from 'util';
import { Message } from '../interfaces/message/message.interface';

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
        {messages.length
          ? messages.map((m) => {
              return (
                <div key={m.id} className="message">
                  {renderAvatar(m.user)}

                  <div className="datetime">
                    {m.user.username}: <i>{moment(m.timestamp).fromNow()}</i>
                  </div>
                  <p>{m.text}</p>
                </div>
              );
            })
          : ''}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
