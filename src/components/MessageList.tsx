import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import { isObject } from 'util';
import { Message } from '../interfaces/message/message.interface';
import ChannelThread from './ChannelThread';

interface MessageProps {
  messages: Message[];
  lastMessage: any;
  preLastMessageId: number;
}

const MessageList: React.FC<MessageProps> = ({
  messages,
  lastMessage,
  preLastMessageId,
}) => {
  useEffect(() => {
    scrollToBottom();
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (isObject(messagesEndRef) && messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView();
    }
  };

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

  const renderMessages = (message: Message) => {
    return (
      <div key={message.id} className="message">
        {renderAvatar(message.user)}

        <div className="datetime">
          {message.user.username}: <i>{moment(message.timestamp).fromNow()}</i>
        </div>
        <p>{message.text}</p>
        <ChannelThread
          message={message.id}
          channel_threads={message.channel_threads}
        />
      </div>
    );
  };

  return (
    <>
      {[...messages]?.reverse()?.map((message) => renderMessages(message))}

      {lastMessage &&
      preLastMessageId !== 0 &&
      preLastMessageId < lastMessage.id
        ? renderMessages(lastMessage)
        : ''}

      <div ref={messagesEndRef} />
    </>
  );
};

export default MessageList;
