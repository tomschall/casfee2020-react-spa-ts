import React from 'react';
import ChatContainer from '../shared/ChatContainer';
import { Container } from '@material-ui/core';

const ChatBoard: React.FC = () => {
  return (
      <Container maxWidth="xl">
        <ChatContainer />
      </Container>
  );
};

export default ChatBoard;
