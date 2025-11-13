export interface PostDTO {
  id: string;
  name: string;
  description: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export type CreatePostInput = {
  name: string;
  description: string;
};
