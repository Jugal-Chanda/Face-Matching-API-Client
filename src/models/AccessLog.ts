export interface AccessLog {
  id: number;
  user_id: number;
  response: { distance: number; time: number };
  created_at: string;
}
