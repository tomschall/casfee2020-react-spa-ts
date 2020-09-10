export interface Message {
  id: number;
  user_id: string;
  text: string;
  timestamp: Date;
  user?: any;
  channel?: any;
  channel_threads?: any;
}
