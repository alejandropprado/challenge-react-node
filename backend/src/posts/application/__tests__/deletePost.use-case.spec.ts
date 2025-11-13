import { DeletePost } from "../deletePost.use-case";
import { IPostRepository } from "../../domain/post.repository";
import { Post } from "../../domain/post";
import { v4 as uuidv4 } from "uuid";
import { PostId } from "../../domain/value-objects/postId.value-object";

jest.mock("uuid", () => ({
  v4: jest.fn(),
  validate: jest.requireActual("uuid").validate,
}));

const mockUuidv4 = uuidv4 as jest.MockedFunction<typeof uuidv4>;
const FIXED_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("DeletePost Use Case", () => {
  let deletePost: DeletePost;
  let mockRepository: jest.Mocked<IPostRepository>;

  beforeAll(() => {
    mockUuidv4.mockReturnValue(FIXED_UUID);
  });

  beforeEach(() => {
    mockRepository = {
      createPost: jest.fn(),
      deletePost: jest.fn(),
      getAllPosts: jest.fn(),
    };

    deletePost = new DeletePost(mockRepository);
    mockUuidv4.mockClear();
  });

  describe("execute", () => {
    it("should delete a post successfully", async () => {
      const postId = PostId.generate();
      const postToDelete: Post = Post.create("Post to Delete", "Description");

      mockRepository.deletePost.mockResolvedValue(postToDelete);

      await deletePost.execute(postId.value);

      expect(mockRepository.deletePost).toHaveBeenCalledWith(postId);
      expect(mockRepository.deletePost).toHaveBeenCalledTimes(1);
    });

    it("should throw error when repository fails", async () => {
      const postId = "123e4567-e89b-12d3-a456-426614174000";
      const error = new Error("Database connection failed");
      mockRepository.deletePost.mockRejectedValue(error);

      await expect(deletePost.execute(postId)).rejects.toThrow(
        "Database connection failed"
      );
      expect(mockRepository.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
