import { IPost, Post } from "../domain/post";
import { IPostRepository } from "../domain/post.repository";

export class CreatePost {
  constructor(private repository: IPostRepository) {}

  async execute(name: string, description: string): Promise<IPost> {
    const post = Post.create(name, description);
    await this.repository.createPost(post);

    return post.toPrimitive();
  }
}
