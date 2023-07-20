import { createSlice } from '@reduxjs/toolkit';
import { createPost, deletePost, getPosts } from './timelineAPI';

const timelineSlice = createSlice({
  name: 'timeline',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.status = 'loading';
    }).addCase(getPosts.fulfilled, (state, { type, payload }) => {
      state.status = 'succeeded';
      state.posts = payload;
    }).addCase(getPosts.rejected, (state, action) => {
      state.status = 'failed';
    });
    builder.addCase(createPost.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(createPost.fulfilled, (state, { type, payload }) => {
      state.status = 'succeeded';
      state.posts.push(payload);
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(deletePost.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(deletePost.fulfilled, (state, { type, payload }) => {
      state.status = 'succeeded';
      state.posts = state.posts.filter((post) => post.id !== payload);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export const { post } = timelineSlice.actions;

export default timelineSlice.reducer;
