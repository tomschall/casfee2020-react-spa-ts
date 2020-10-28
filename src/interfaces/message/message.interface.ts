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
