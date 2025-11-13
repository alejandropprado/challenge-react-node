import axios from "axios";
import { env } from "../../shared/env";
import type { PostDTO, CreatePostInput } from "./types";

const api = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 10000,
});

export const PostsAPI = {
  async list(): Promise<PostDTO[]> {
    const { data } = await api.get<{ items: PostDTO[] }>("/posts");

    return data.items;
  },
  async create(input: CreatePostInput): Promise<PostDTO> {
    const { data } = await api.post<PostDTO>("/posts", input);

    return data;
  },
  async remove(id: string): Promise<PostDTO> {
    const { data } = await api.delete<PostDTO>(`/posts/${id}`);

    return data;
  },
};
