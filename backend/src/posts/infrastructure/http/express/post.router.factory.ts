import { Router } from "express";
import { CreatePost } from "../../../application/createPost.use-case";
import { DeletePost } from "../../../application/deletePost.use-case";
import { ListPosts } from "../../../application/listPost.use-case";
import { CreatePostSchema } from "../../../../shared/validation/postSchema";
import { IPostRepository } from "../../../domain/post.repository";

export function buildPostRouter(repository: IPostRepository) {
  const router = Router();

  const createPost = new CreatePost(repository);
  const deletePost = new DeletePost(repository);
  const listPosts = new ListPosts(repository);

  router.get("/", async (_req, res, next) => {
    try {
      const posts = await listPosts.execute();
      return res.json({
        items: posts,
      });
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const input = CreatePostSchema.parse(req.body);
      const created = await createPost.execute(input.name, input.description);
      return res.status(201).json(created);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const deleted = await deletePost.execute(req.params.id);
      return res.json(deleted);
    } catch (e) {
      next(e);
    }
  });

  return router;
}
