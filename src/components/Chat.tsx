import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { Query, useApolloClient } from 'react-apollo';
import { useRecoilState } from 'recoil';
import {
  messagesState,
  newMessagesState,
  refetchMessagesState,
  atomChannelState,
  actualChannelState,
} from '../atom.js';
import MessageList from './MessageList';
import MessageSub from './MessageSub';
import { Message } from '../interfaces/message/message.interface';
import { useParams } from 'react-router';

const GET_MESSAGES = gql`
  query(
    $last_received_id: Int
    $last_received_ts: timestamptz
    $channel: String
    $user_id: Int
  ) {
    user_channels(
      where: {
        channel: { name: { _eq: $channel } }
        _and: { user_id: { _eq: $user_id } }
      }
    ) {
      channel {
        messages(
          order_by: { timestamp: asc }
          where: {
            _and: {
              id: { _neq: $last_received_id }
              timestamp: { _gte: $last_received_ts }
            }
          }
        ) {
          id
          text
          timestamp
          user {
            username
          }
          channel {
            name
          }
        }
      }
    }
  }
`;

interface ChatProps {
  username: string;
  user_id: number;
}

const Chat: React.FC<ChatProps> = ({ username, user_id }) => {
  const [error, setError] = useState<Error | null>(null);
  const [channelState, setChannel] = useRecoilState<any>(atomChannelState);
  const [actualChannel, setActualChannel] = useRecoilState<any>(
    actualChannelState,
  );
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
    // const UpdateState = selector<any[]>({
    //   key: 'updateState',
    //   get: (opts: { get: any }) => {
    //     const m = opts.get(messagesState);
    //     const n = opts.get(newMessagesState);
    //     const a = opts.get(actualChannelState);
    //     return [m, n, a];
    //   },
    //   set: (opts: { get: any; set: any }, [m, n, a]: any) => {
    //     opts.set(messagesState, []);
    //     opts.set(newMessagesState, []);
    //     opts.set(actualChannelState, []);
    //   },
    // });
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
          user_id,
        };
      } else {
        return {
          last_received_id: -1,
          last_received_ts: '2018-08-21T19:58:46.987552+00:00',
          channel,
          user_id,
        };
      }
    } else {
      return {
        last_received_id: newMessages[newMessages.length - 1].id,
        last_received_ts: newMessages[newMessages.length - 1].timestamp,
        channel,
        user_id,
      };
    }
  };
  // add new (unread) messages to state
  const addNewMessages = (messages: Message[]) => {
    const newMessagesArr = [...newMessages];
    messages.forEach((m) => {
      // do not add new messages from self
      if (m.user !== user_id) {
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

      if (
        resp.data.user_channels &&
        resp.data.user_channels[0] &&
        resp.data.user_channels[0].channel.messages.length
      ) {
        console.log('resp.data', resp.data);
        if (!isViewScrollable()) {
          console.log('is not scrollable');
          addOldMessages(resp.data.user_channels[0].channel.messages);
        } else {
          if (bottom) {
            console.log('this.state.bottom');
            addOldMessages(resp.data.user_channels[0].channel.messages);
          } else {
            console.log('!this.state.bottom');
            addNewMessages(resp.data.user_channels[0].channel.messages);
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

          console.log('Query received Messages', data);
          console.log('Query received Messages', getLastReceivedVars());

          // load all messages to state in the beginning
          if (
            data.user_channels &&
            data.user_channels[0] &&
            data.user_channels[0].channel.length &&
            data.user_channels[0].channel.messages.length !== 0
          ) {
            if (messages.length === 0) {
              console.log('add old stuff');
              addOldMessages(data.user_channels[0].channel.messages);
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
