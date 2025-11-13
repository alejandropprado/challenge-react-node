import { IPost } from "../domain/post";
import { IPostRepository } from "../domain/post.repository";

export class ListPosts {
  constructor(private repository: IPostRepository) {}

  async execute(): Promise<IPost[]> {
    const allposts = await this.repository.getAllPosts();
    const postsToPrimitive: IPost[] = allposts.map((post) =>
      post.toPrimitive()
    );

    return postsToPrimitive;
  }
}
