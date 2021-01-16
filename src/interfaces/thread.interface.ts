import { Channel_Type_Enum } from '../api/generated/graphql';

export interface ChannelThread {
  channel_thread_messages?: ChannelThreadThreadMessages[];
  id: number;
  message: MessageChannelThread;
  message_id?: number;
}

export interface MessageChannelThread {
  channel?: { id: number; name: string; channel_type: Channel_Type_Enum };
  deleted: false;
  id: number;
  image: string | null;
  text: string;
  timestamp: string;
  user: { auth0_user_id: string; id: number; username: string };
}

export interface MessageChannelThreadList {
  channel: { id: number; name: string; channel_type: Channel_Type_Enum };
  deleted: false;
  id: number;
  image: string | null;
  text: string;
  timestamp: string;
  user: { auth0_user_id: string; id: number; username: string };
  user_id: string;
}

export interface ChannelThreadList {
  channel_thread_messages: ChannelThreadThreadMessages[];
  id: number;
  message: MessageChannelThreadList;
  message_id: number;
}

export interface ChannelThreadThreadMessages {
  id: number;
  image: string | null;
  message: string;
  timestamp: string;
  user: { auth0_user_id: string; id: number; username: string };
  user_id: string;
}
