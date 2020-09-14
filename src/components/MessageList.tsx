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

  return (
    <>
      {[...messages]?.reverse()?.map((m) => {
        return (
          <div key={m.id} className="message">
            {renderAvatar(m.user)}

            <div className="datetime">
              {m.user.username}: <i>{moment(m.timestamp).fromNow()}</i>
            </div>
            <p>{m.text}</p>
            <ChannelThread message={m.id} channel_threads={m.channel_threads} />
          </div>
        );
      })}

      {lastMessage &&
      lastMessage.id > 0 &&
      preLastMessageId !== 0 &&
      preLastMessageId !== lastMessage.id ? (
        <div key={lastMessage.id} className="message">
          {renderAvatar(lastMessage.user)}

          <div className="datetime">
            {lastMessage.username}:{' '}
            <i>{moment(lastMessage.timestamp).fromNow()}</i>
          </div>
          <p>{lastMessage.text}</p>
          <ChannelThread
            message={lastMessage.id}
            channel_threads={lastMessage.channel_threads}
          />
        </div>
      ) : (
        ''
      )}

      <div ref={messagesEndRef} />
    </>
  );
};

export default MessageList;
