import { PostId } from "./value-objects/postId.value-object";

export interface IPost {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Post {
  constructor(
    public readonly id: PostId,
    public name: string,
    public description: string,
    public createdAt?: Date,
    public updatedAt?: Date,
    public deletedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  static create(name: string, description: string): Post {
    const date = new Date();

    return new Post(
      PostId.generate(),
      name,
      description,
      date,
      date,
      undefined
    );
  }

  toPrimitive(): IPost {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}
