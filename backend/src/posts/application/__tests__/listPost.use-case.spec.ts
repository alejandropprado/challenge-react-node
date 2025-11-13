import { ListPosts } from "../listPost.use-case";
import { IPostRepository } from "../../domain/post.repository";
import { Post } from "../../domain/post";

describe("ListPosts Use Case", () => {
  let listPosts: ListPosts;
  let mockRepository: jest.Mocked<IPostRepository>;

  beforeEach(() => {
    mockRepository = {
      createPost: jest.fn(),
      deletePost: jest.fn(),
      getAllPosts: jest.fn(),
    };

    listPosts = new ListPosts(mockRepository);
  });

  describe("execute", () => {
    it("should list all posts successfully", async () => {
      const posts: Post[] = [
        Post.create("Post 1", "Description 1"),
        Post.create("Post 2", "Description 2"),
      ];

      mockRepository.getAllPosts.mockResolvedValue(posts);

      const result = await listPosts.execute();

      expect(result).toEqual(posts.map((post) => post.toPrimitive()));
      expect(mockRepository.getAllPosts).toHaveBeenCalledTimes(1);
    });

    it("should throw error when repository fails", async () => {
      const error = new Error("Database connection failed");
      mockRepository.getAllPosts.mockRejectedValue(error);

      await expect(listPosts.execute()).rejects.toThrow(
        "Database connection failed"
      );
      expect(mockRepository.getAllPosts).toHaveBeenCalledTimes(1);
    });
  });
});
