import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PostsAPI } from "./api";
import type { PostDTO, CreatePostInput } from "./types";

type PostsState = {
  items: PostDTO[];
  filter: string;
  loading: boolean;
  error?: string | null;
  loaded: boolean; // 👈 para garantizar un solo fetch por carga
};

const initialState: PostsState = {
  items: [],
  filter: "",
  loading: true,
  error: null,
  loaded: false,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const data = await PostsAPI.list();
  return data;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (input: CreatePostInput) => {
    const data = await PostsAPI.create(input);
    return data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string) => {
    const data = await PostsAPI.remove(id);
    return data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<PostDTO[]>) => {
          state.loading = false;
          state.items = action.payload;
          state.loaded = true;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error cargando posts";
      })
      .addCase(createPost.pending, (state) => {
        state.error = null;
      })
      .addCase(
        createPost.fulfilled,
        (state, action: PayloadAction<PostDTO>) => {
          state.items.unshift(action.payload);
        }
      )
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.error.message ?? "Error creando post";
      })
      // delete
      .addCase(
        deletePost.fulfilled,
        (state, action: PayloadAction<PostDTO>) => {
          state.items = state.items.filter((p) => p.id !== action.payload.id);
        }
      )
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.error.message ?? "Error eliminando post";
      });
  },
});

export const { setFilter, reset } = postsSlice.actions;
export default postsSlice.reducer;
