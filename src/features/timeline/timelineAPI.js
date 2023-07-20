import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('timeline/getPosts', async () => {
  const response = await axios.get('http://localhost:5050/posts');
  return response.data;
});
export const createPost = createAsyncThunk(
  'timeline/createPost',
  async (post) => {
    const response = await axios.post('http://localhost:5050/posts', post);
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  'timeline/deletePost',
  async (id) => {
    await axios.delete('http://localhost:5050/posts/' + id);
    return id;
  }
);
