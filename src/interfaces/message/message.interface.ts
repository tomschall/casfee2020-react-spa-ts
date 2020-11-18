export interface Message {
  id: number;
  user_id: string;
  text: string;
  image: string;
  timestamp: Date;
  user?: any;
  channel?: any;
  channel_threads?: any;
}

export interface ThreadMessage {
  id: number;
  user_id: string;
  channel_thread_id: number;
  message: string;
  image: string;
  timestamp: Date;
  user?: any;
  channel_threads?: any;
}
