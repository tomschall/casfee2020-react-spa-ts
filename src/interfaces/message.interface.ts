import { Moment } from 'moment';

export interface Message {
  id: number;
  user_id: string;
  text: string;
  image: string;
  timestamp: Date | Moment;
  deleted?: boolean;
  user?: any;
  channel?: any;
  channel_thread?: any;
}

export interface ThreadMessage {
  id: number;
  user_id: string;
  channel_thread_id: number;
  message: string;
  image: string;
  timestamp: Date;
  user?: any;
  limit: number;
}
