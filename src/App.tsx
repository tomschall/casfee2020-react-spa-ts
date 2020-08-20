import React, { useState, useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { RecoilRoot } from 'recoil';
import ChatApp from './components/ChatApp';

const App: React.FC = () => {
  return (
    <div className="app">
      <RecoilRoot>
        <ApolloConsumer>
          {(client) => {
            return <ChatApp client={client} />;
          }}
        </ApolloConsumer>
      </RecoilRoot>
    </div>
  );
};

export default App;
