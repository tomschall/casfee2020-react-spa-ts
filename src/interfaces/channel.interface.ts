import { Channel_Type_Enum } from '../api/generated/graphql';

export interface Channel {
  channel_type: Channel_Type_Enum;
  id: number;
  is_private: boolean;
  name: string;
  owner_id?: string | null;
}
