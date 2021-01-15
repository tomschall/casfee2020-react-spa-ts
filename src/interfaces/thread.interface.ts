import { Message } from './message.interface';

export interface ChannelThread {
  id: number;
  message: MessageChannelThread;
}

export interface MessageChannelThread {
  deleted: false;
  id: number;
  image: string | null;
  text: string;
  timestamp: string;
  user: { auth0_user_id: string; id: number; username: string };
}

export interface MessageChannelThreadList {
  channel: { id: number; name: string };
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
