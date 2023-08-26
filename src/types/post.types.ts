export interface PostModel {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CommentModel {
  id: string;
  content: string;
  user_id: string;
  post_id: string
  created_at: Date;
  updated_at: Date;
}

export interface CreatPostPayload {
  user_id: string;
  title: string;
  content: string;
}

export interface PostCommetPayload {
  content: string
}