export interface Message {
  id: number;
  user_id: number;
  text: string;
  timestamp: Date;
  user?: any;
  channel?: any;
}
