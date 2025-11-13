import { IPostRepository } from "../../domain/post.repository";
import { PostEntity } from "./post.entity";
import { AppDataSource } from "../../../infrastructure/database/data-source";
import { Post } from "../../domain/post";
import { PostMapper } from "./mappers/post.mapper";
import { PostId } from "../../domain/value-objects/postId.value-object";

export class PosgreSQLPostRepository implements IPostRepository {
  private repository = AppDataSource.getRepository(PostEntity);

  async createPost(post: Post): Promise<Post> {
    const entity = PostMapper.toEntity(post);
    await this.repository.save(entity);

    return post;
  }

  async deletePost(postId: PostId): Promise<Post> {
    const found = await this.repository.findOneByOrFail({ id: postId.value });
    await this.repository.softDelete({ id: postId.value });
    const deleted = await this.repository.findOne({
      where: { id: postId.value },
      withDeleted: true,
    });

    return PostMapper.toDomain(deleted ?? found);
  }

  async getAllPosts(): Promise<Post[]> {
    const posts = await this.repository.find();

    return posts.map(PostMapper.toDomain);
  }
}
