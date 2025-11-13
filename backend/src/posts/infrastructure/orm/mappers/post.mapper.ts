import { Post } from "../../../domain/post";
import { PostEntity } from "../post.entity";
import { PostId } from "../../../domain/value-objects/postId.value-object";

export const PostMapper = {
  toDomain(entity: PostEntity): Post {
    return new Post(
      PostId.from(entity.id),
      entity.name,
      entity.description,
      entity.createdAt ?? undefined,
      entity.updatedAt ?? undefined,
      entity.deletedAt ?? undefined
    );
  },

  toEntity(post: Post): PostEntity {
    const entity = new PostEntity();
    const date = new Date();

    entity.id = post.id.value;
    entity.name = post.name;
    entity.description = post.description;
    entity.createdAt = post.createdAt ?? date;
    entity.updatedAt = post.updatedAt ?? date;
    entity.deletedAt = post.deletedAt ?? null;

    return entity;
  },
};
