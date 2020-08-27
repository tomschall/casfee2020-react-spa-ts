import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Query, useApolloClient } from 'react-apollo';
import { useRecoilState } from 'recoil';
import {
  messagesState,
  newMessagesState,
  refetchMessagesState,
  atomChannelState,
} from '../atom.js';
import MessageList from './MessageList';
import MessageSub from './MessageSub';
import { Message } from '../interfaces/message/message.interface';
import { useParams, useHistory } from 'react-router';

const GET_MESSAGES = gql`
  query(
    $last_received_id: Int
    $last_received_ts: timestamptz
    $channel: String
  ) {
    message(
      order_by: { timestamp: asc }
      where: {
        _and: {
          id: { _neq: $last_received_id }
          timestamp: { _gte: $last_received_ts }
          channel: { name: { _eq: $channel } }
        }
      }
    ) {
      id
      text
      timestamp
      user {
        username
      }
    }
  }
`;

interface ChatProps {
  username: string;
  userId: number;
}

const Chat: React.FC<ChatProps> = ({ username, userId }) => {
  const [error, setError] = useState<Error | null>(null);
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);
  const [actualChannel, setActualChannel] = useState<any>();
  const [refetchState, setRefetch] = useRecoilState<any>(refetchMessagesState);
  const [bottom, setBottom] = useState<any>();
  const [messages, setMessages] = useRecoilState<any>(messagesState);
  const [newMessages, setNewMessages] = useRecoilState<any>(newMessagesState);

  const client = useApolloClient();

  useEffect(() => {
    console.log('component Chat did mount');

    return function cleanup() {
      console.log('component Chat did unmount');
      setRefetch(null);
    };
  }, []);

  let { channel } = useParams();

  if (actualChannel !== channel) {
    setMessages([]);
    setNewMessages([]);
    setActualChannel(channel);
  }

  console.log('channelState', channelState);

  if (channelState) {
    const chanObj = channelState.filter((c: any) => c.name === channel);
    console.log('chanObj', chanObj);
  }

  if (!actualChannel) setActualChannel(channel);

  // get appropriate query variables
  const getLastReceivedVars = () => {
    if (newMessages.length === 0) {
      if (messages.length !== 0) {
        return {
          last_received_id: messages[messages.length - 1].id,
          last_received_ts: messages[messages.length - 1].timestamp,
          channel,
        };
      } else {
        return {
          last_received_id: -1,
          last_received_ts: '2018-08-21T19:58:46.987552+00:00',
          channel,
        };
      }
    } else {
      return {
        last_received_id: newMessages[newMessages.length - 1].id,
        last_received_ts: newMessages[newMessages.length - 1].timestamp,
        channel,
      };
    }
  };
  // add new (unread) messages to state
  const addNewMessages = (messages: Message[]) => {
    const newMessagesArr = [...newMessages];
    messages.forEach((m) => {
      // do not add new messages from self
      if (m.user !== userId) {
        newMessagesArr.push(m);
      }
    });
    setNewMessages(newMessagesArr);
  };

  // add old (read) messages to state
  const addOldMessages = (msgs: Message[]) => {
    const oldMessages = [...messages, ...msgs];
    setMessages(oldMessages);
    setNewMessages([]);
  };

  const refetchData = async () => {
    if (refetchState) {
      const resp = await refetchState(getLastReceivedVars());

      if (resp.data && resp.data.message.length) {
        console.log('resp.data', resp.data);
        if (!isViewScrollable()) {
          console.log('is not scrollable');
          addOldMessages(resp.data.message);
        } else {
          if (bottom) {
            console.log('this.state.bottom');
            addOldMessages(resp.data.message);
          } else {
            console.log('!this.state.bottom');
            addNewMessages(resp.data.message);
          }
        }
      }
    }
  };

  // check if the view is scrollable
  const isViewScrollable = () => {
    const isInViewport = (elem: any) => {
      const bounding = elem.getBoundingClientRect();
      return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    if (document.getElementById('lastMessage')) {
      return !isInViewport(document.getElementById('lastMessage'));
    }
    return false;
  };

  return (
    <React.Fragment>
      <Query
        query={GET_MESSAGES}
        variables={getLastReceivedVars()}
        fetchPolicy="network-only"
      >
        {({
          data,
          loading,
          subscribeToMore,
          refetch,
        }: {
          data: any;
          loading: any;
          subscribeToMore: any;
          refetch: any;
        }) => {
          if (!refetchState) {
            setRefetch(() => refetch);
          }

          if (!data) {
            return null;
          }

          if (loading) {
            return null;
          }

          console.log('Query received Messages', data && data.message);
          console.log('Query received Messages', getLastReceivedVars());

          // load all messages to state in the beginning
          if (data.message.length !== 0) {
            if (messages.length === 0) {
              console.log('add old stuff');
              addOldMessages(data.message);
            }
          }

          return (
            <MessageSub
              subscribeToMore={subscribeToMore}
              refetch={refetchData}
            ></MessageSub>
          );
        }}
      </Query>
      <MessageList messages={messages} />
    </React.Fragment>
  );
};

export default Chat;
