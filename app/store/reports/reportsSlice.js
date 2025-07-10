import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch leads closed in the last 7 days
export const fetchClosedLeads = createAsyncThunk(
  "report/fetchClosedLeads",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://codeflix-crm-backend.vercel.app/report/last-week`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchClosedLeadsLastWeek = createAsyncThunk(
  "report/fetchClosedLeadsLastWeek",
  async () => {
    const response = await fetch("https://codeflix-crm-backend.vercel.app/report/last-week");
    const data = await response.json();

    if (response.ok && data.count >= 0) {
      return data.count; // or data.data if needed
    } else {
      // Return 0 for no closed leads
      return 0;
    }
  }
);

// ✅ Fetch total leads in pipeline
export const fetchPipeline = createAsyncThunk(
  "report/fetchPipeline",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://codeflix-crm-backend.vercel.app/report/pipeline`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    closedLeads: [],
    pipelineCount: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Closed Leads
      .addCase(fetchClosedLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClosedLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.closedLeads = action.payload;
      })
      .addCase(fetchClosedLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // ✅ Pipeline Count
      .addCase(fetchPipeline.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPipeline.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pipelineCount = action.payload.totalLeadsInPipeline;
      })
      .addCase(fetchPipeline.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default reportSlice.reducer;
