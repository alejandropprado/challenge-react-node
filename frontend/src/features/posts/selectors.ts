import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

const selectPostsState = (s: RootState) => s.posts;
export const selectFilter = (s: RootState) => s.posts.filter;

export const selectFilteredPosts = createSelector(
  [selectPostsState],
  (postsState) => {
    const q = postsState.filter.trim().toLowerCase();

    if (!q) return postsState.items;
  
    return postsState.items.filter((p) => p.name.toLowerCase().includes(q));
  }
);

export const selectLoading = (s: RootState) => s.posts.loading;
export const selectError = (s: RootState) => s.posts.error;
export const selectLoaded = (s: RootState) => s.posts.loaded;
