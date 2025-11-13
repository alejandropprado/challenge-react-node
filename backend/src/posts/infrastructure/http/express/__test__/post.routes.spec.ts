import request from "supertest";
import express from "express";
import { buildPostRouter } from "../post.router.factory";
import { IPostRepository } from "../../../../domain/post.repository";
import { Post } from "../../../../domain/post";
import { v4 as uuidv4 } from "uuid";
import { errorHandler } from "../../../../../shared/http/errors";

jest.mock("uuid");
const mockUuidv4 = uuidv4 as jest.MockedFunction<typeof uuidv4>;

const FIXED_DATE = new Date("2025-01-01T10:00:00Z");
const MOCK_UUID = "123e4567-e89b-12d3-a456-426614174000";

describe("buildPostRouter Factory", () => {
  let app: express.Application;
  let mockRepository: jest.Mocked<IPostRepository>;

  let mockPost: Post;

  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(FIXED_DATE);
    mockUuidv4.mockReturnValue(MOCK_UUID);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    mockPost = Post.create("Test Post", "This is a test post description");
    mockRepository = {
      createPost: jest.fn(),
      deletePost: jest.fn(),
      getAllPosts: jest.fn(),
    };

    const router = buildPostRouter(mockRepository);
    app = express();
    app.use(express.json());
    app.use("/", router);

    // Error handling middleware
    app.use((err: any, req: any, res: any, next: any) => {
      const status = err?.status ?? 500;
      const message = err?.message ?? "Internal Server Error";
      res.status(status).json({ error: message });
    });
    mockUuidv4.mockClear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    mockUuidv4.mockClear();
  });

  describe("Factory Function", () => {
    it("should create a router instance", () => {
      // Act
      const router = buildPostRouter(mockRepository);

      // Assert
      expect(router).toBeDefined();
      expect(typeof router).toBe("function"); // Express Router is a function
    });

    it("should inject repository into use cases", () => {
      // Act
      const router = buildPostRouter(mockRepository);

      // Assert
      expect(router).toBeDefined();
      // We can verify the router was created successfully
      expect(router.stack).toBeDefined();
      expect(router.stack.length).toBeGreaterThan(0);
    });
  });

  describe("GET / - List Posts", () => {
    it("should return empty array when no posts exist", async () => {
      mockRepository.getAllPosts.mockResolvedValue([]);

      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ items: [] });
      expect(mockRepository.getAllPosts).toHaveBeenCalledTimes(1);
    });

    it("should return posts array when posts exist", async () => {
      const mockPosts = [mockPost];
      mockRepository.getAllPosts.mockResolvedValue(mockPosts);

      const response = await request(app).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(
        { 
          items: mockPosts.map((post) => ({
          ...post.toPrimitive(),
          createdAt: post?.createdAt?.toISOString(),
          updatedAt: post?.updatedAt?.toISOString(),
          deletedAt: post?.deletedAt ? post.deletedAt.toISOString() : undefined,
        }))
        }
      );
      expect(response.body.items).toHaveLength(1);
      expect(mockRepository.getAllPosts).toHaveBeenCalledTimes(1);
    });

    it("should handle repository errors", async () => {
      mockRepository.getAllPosts.mockRejectedValue(
        new Error("Database connection failed")
      );

      const response = await request(app).get("/");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Database connection failed" });
      expect(mockRepository.getAllPosts).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST / - Create Post", () => {
    const validRequestBody = {
      name: "New Post",
      description: "New Description",
    };

    it("should create post successfully with valid data", async () => {
      const postToCreate = Post.create(
        validRequestBody.name,
        validRequestBody.description
      );
      mockRepository.createPost.mockResolvedValue(postToCreate);

      const response = await request(app)
        .post("/")
        .send(validRequestBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...postToCreate.toPrimitive(),
        createdAt: postToCreate?.createdAt?.toISOString(),
        updatedAt: postToCreate?.updatedAt?.toISOString(),
        deletedAt: postToCreate?.deletedAt
          ? postToCreate.deletedAt.toISOString()
          : undefined,
      });
      expect(mockRepository.createPost).toHaveBeenCalledWith(postToCreate);
      expect(mockRepository.createPost).toHaveBeenCalledTimes(1);
    });

    it("should validate name is required", async () => {
      const invalidBody = { description: "Valid description" };

      const response = await request(app)
        .post("/")
        .send(invalidBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(mockRepository.createPost).not.toHaveBeenCalled();
    });

    it("should validate description is required", async () => {
      // Arrange
      const invalidBody = { name: "Valid name" };

      // Act
      const response = await request(app)
        .post("/")
        .send(invalidBody)
        .set("Content-Type", "application/json");

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(mockRepository.createPost).not.toHaveBeenCalled();
    });

    it("should validate name is not empty", async () => {
      const invalidBody = { name: "", description: "Valid description" };

      const response = await request(app)
        .post("/")
        .send(invalidBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body.error).toContain(
        "Too small: expected string to have >=1 characters"
      );
      expect(mockRepository.createPost).not.toHaveBeenCalled();
    });

    it("should validate description is not empty", async () => {
      const invalidBody = { name: "Valid name", description: "" };

      const response = await request(app)
        .post("/")
        .send(invalidBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body.error).toContain(
        "Too small: expected string to have >=1 characters"
      );
      expect(mockRepository.createPost).not.toHaveBeenCalled();
    });

    it("should validate name max length", async () => {
      const invalidBody = {
        name: "a".repeat(256), // Exceeds 255 character limit
        description: "Valid description",
      };

      const response = await request(app)
        .post("/")
        .send(invalidBody)
        .set("Content-Type", "application/json");

      expect(response.status).toBe(500);
      expect(response.body.error).toContain(
        "Too big: expected string to have <=255 characters"
      );
      expect(mockRepository.createPost).not.toHaveBeenCalled();
    });

    it("should handle repository errors during creation", async () => {
      // Arrange
      mockRepository.createPost.mockRejectedValue(
        new Error("Failed to create post")
      );

      // Act
      const response = await request(app)
        .post("/")
        .send(validRequestBody)
        .set("Content-Type", "application/json");

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Failed to create post" });
      expect(mockRepository.createPost).toHaveBeenCalledTimes(1);
    });

    it("should handle malformed JSON", async () => {
      // Act
      const response = await request(app)
        .post("/")
        .send("invalid json")
        .set("Content-Type", "application/json");

      // Assert
      expect(response.status).toBe(400); // Express default for malformed JSON
    });

    it("should handle missing request body", async () => {
      // Act
      const response = await request(app)
        .post("/")
        .send({})
        .set("Content-Type", "application/json");

      // Assert
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("error");
      expect(mockRepository.createPost).not.toHaveBeenCalled();
    });
  });
});
