import type { Post } from "./post";
import { PostId } from "./value-objects/postId.value-object";

export interface IPostRepository {
  createPost(post: Post): Promise<Post>;
  deletePost(postId: PostId): Promise<Post>;
  getAllPosts(): Promise<Post[]>;
}
