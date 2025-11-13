import { IPost } from "../domain/post";
import { IPostRepository } from "../domain/post.repository";
import { PostId } from "../domain/value-objects/postId.value-object";

export class DeletePost {
  constructor(private repository: IPostRepository) {}

  async execute(postID: string): Promise<IPost> {
    const id = PostId.from(postID);

    const deleted = await this.repository.deletePost(id);

    return deleted.toPrimitive();
  }
}
