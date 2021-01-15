import { Moment } from 'moment';
import { Channel, User } from '../api/generated/graphql';

export interface Message {
  id: number;
  user_id: string;
  text: string;
  image: string | null;
  timestamp: Date | Moment;
  deleted?: boolean;
  user?: Pick<User, 'auth0_user_id' | 'username'>;
  channel?: { name: string };
}

export interface ThreadMessage {
  id: number;
  user_id: string;
  channel_thread_id: number;
  message: string;
  image: string | null;
  timestamp: Date;
  user?: Pick<User, 'auth0_user_id' | 'username'>;
  limit: number;
}
