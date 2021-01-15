export interface Auth0User {
  email?: string;
  email_verified?: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  sub?: string;
  updated_at?: string;
}

export interface User {
  auth0_user_id: string;
  user_channels?: any[];
  username: string;
}
