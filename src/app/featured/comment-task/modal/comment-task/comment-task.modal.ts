export interface Comments {
  id: number;
  userId: number;
  body: string;

  isEditing?: boolean;
  originalBody: string;
}

export interface CommentsResponse {
  comments: Comments[];
  total: number;
  skip: number;
  limit: number;
}