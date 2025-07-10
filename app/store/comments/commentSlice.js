import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Pass 'id' as a parameter
export const fetchComments = createAsyncThunk(
  "leads/fetchComments",
  async (id) => {
    const response = await axios.get(
      `https://codeflix-crm-backend.vercel.app/leads/${id}/comments`
    );
    return response.data;
  }
);
// export const addComment = createAsyncThunk(
//   "leads/addComment",
//   async ({ id, commentText }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `https://codeflix-crm-backend.vercel.app/leads/${id}/comments`,
//         { text: commentText }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const addComment = createAsyncThunk(
  "leads/addComment",
  async (data, { rejectWithValue }) => {
    const { id, commentText, author } = data;
    try {
      const response = await axios.post(
        `https://codeflix-crm-backend.vercel.app/leads/${id}/comments`,
        {
          commentText,
          author,
        }
      );

      if (response.data?.error) {
        return rejectWithValue(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);



export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (action.payload && !action.payload.error) {
          state.comments.push(action.payload);
          state.status = "succeeded";
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default commentSlice.reducer;
