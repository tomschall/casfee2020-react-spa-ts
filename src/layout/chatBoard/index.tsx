import React from 'react';
import ChatContainer from '../shared/ChatContainer';
import useStyles from './styles';
import { Container } from '@material-ui/core';

const ChatBoard: React.FC = () => {
  const classes = useStyles();

  return (
      <Container maxWidth="xl">
        <ChatContainer />
      </Container>
  );
};

export default ChatBoard;
