export interface User {
  id?: number;
  username: string;
  expires_at: string;
  password?: string;
  created_at?: string;
  valid_for_days?: number;
}
