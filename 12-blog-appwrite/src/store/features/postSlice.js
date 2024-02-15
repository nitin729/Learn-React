import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from "../../appwrite/config";
import { login, logout } from "./authSlice";

const initialState = {
  posts: [],
  status: "loading",
  post: {},
  userData: null,
  postId: null,
};

export const postsThunk = createAsyncThunk("getAllPosts", async () => {
  const response = await service.getAllPosts();
  return response.documents;
});

export const getPost = createAsyncThunk("getPost", async (slug) => {
  const response = await service.getPost(slug);
  console.log(response, "slug");
  return response;
});
export const editPost = createAsyncThunk("editPost", async ({ data, post }) => {
  const file = (await data.image[0]) ? service.uploadFile(data.image[0]) : null;
  if (file) {
    service.deleteFile(post.featuredimage);
  }
  const dbPost = await service.updatePost(post.$id, {
    ...data,
    featuredimage: file ? file.id : undefined,
  });
  return dbPost;
});

export const addPosts = createAsyncThunk(
  "addPost",
  async (data, { getState }) => {
    const file = await service.uploadFile(data.image[0]);
    if (file) {
      const fileId = file.$id;
      const userData = getState().post.userData;
      data.featuredimage = fileId;
      const dbPost = await service.createPost({
        ...data,
        userid: userData.$id,
      });
      return dbPost;
    }
  }
);

export const deletePosts = createAsyncThunk("deletePost", async (post) => {
  const status = await service.deletePost(post.$id);
  if (status) {
    console.log(status, post);
    service.deleteFile(post.featuredimage);
  }
  return post.$id;
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(postsThunk.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(postsThunk.fulfilled, (state, action) => {
        state.loading = "idle";
        state.posts = action.payload;
      })
      .addCase(postsThunk.rejected, (state, action) => {
        state.loading = "idle";
        state.error = action.error.message;
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.postId = action.payload.$id;
        state.posts.push(action.payload);
      })
      .addCase(addPosts.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(login, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(logout, (state) => {
        state.posts = [];
        state.post = {};
        state.userData = null;
        state.postId = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postId = action.payload.$id;
        state.posts.map((post) => {
          return post.$id === action.payload.$id ? action.payload : post;
        });
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.postId = action.payload.$id;
        state.posts.map((post) =>
          post.$id === action.payload.$id ? action.payload : post
        );
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.posts.filter((post) => post.$id !== action.payload.$id);
      });
  },
});

export const { edit } = postSlice.actions;
export default postSlice.reducer;
