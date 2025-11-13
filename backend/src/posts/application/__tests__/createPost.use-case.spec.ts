import { CreatePost } from "../createPost.use-case";
import { IPostRepository } from "../../domain/post.repository";
import { Post } from "../../domain/post";
import { v4 as uuidv4 } from "uuid";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

const mockUuidv4 = uuidv4 as jest.MockedFunction<typeof uuidv4>;

describe("CreatePost Use Case", () => {
  let createPost: CreatePost;
  let mockRepository: jest.Mocked<IPostRepository>;

  const FIXED_DATE = new Date("2025-11-13T10:30:00.000Z");
  const FIXED_UUID = "123e4567-e89b-12d3-a456-426614174000";

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(FIXED_DATE);
    mockUuidv4.mockReturnValue(FIXED_UUID);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockRepository = {
      createPost: jest.fn(),
      deletePost: jest.fn(),
      getAllPosts: jest.fn(),
    };

    createPost = new CreatePost(mockRepository);
    mockUuidv4.mockClear();
  });

  describe("execute", () => {
    it("should create a post successfully", async () => {
      const name = "New Post";
      const description = "New Description";

      const toCreate: Post = Post.create(name, description);

      mockRepository.createPost.mockResolvedValue(toCreate);

      const result = await createPost.execute(name, description);

      expect(result).toEqual(toCreate.toPrimitive());
      expect(mockRepository.createPost).toHaveBeenCalledWith(toCreate);
      expect(mockRepository.createPost).toHaveBeenCalledTimes(1);
    });

    it("should throw error when repository fails", async () => {
      const name = "New Post";
      const description = "New Description";
      const toCreate: Post = Post.create(name, description);

      const error = new Error("Database connection failed");
      mockRepository.createPost.mockRejectedValue(error);

      await expect(createPost.execute(name, description)).rejects.toThrow(
        "Database connection failed"
      );
      expect(mockRepository.createPost).toHaveBeenCalledTimes(1);
    });

    it("should handle empty name", async () => {
      const name = "";
      const description = "Valid description";
      const error = new Error("Name cannot be empty");
      mockRepository.createPost.mockRejectedValue(error);

      await expect(createPost.execute(name, description)).rejects.toThrow(
        "Name cannot be empty"
      );
    });

    it("should handle empty description", async () => {
      // Arrange
      const name = "Valid name";
      const description = "";
      const error = new Error("Description cannot be empty");
      mockRepository.createPost.mockRejectedValue(error);

      await expect(createPost.execute(name, description)).rejects.toThrow(
        "Description cannot be empty"
      );
    });
  });
});
