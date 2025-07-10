import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAgents = createAsyncThunk("agents/fetchAgents", async () => {
  const response = await axios.get(
    "https://codeflix-crm-backend.vercel.app/agents"
  );
  return response.data;
});

export const addAgent = createAsyncThunk(
  "agents/addAgent",
  async (agentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://codeflix-crm-backend.vercel.app/agents",
        agentData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeAgent = createAsyncThunk(
  "agents/removeAgent",
  async ({ id }, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://codeflix-crm-backend.vercel.app/agents/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete agent");
    }
  }
);

export const agentsSlice = createSlice({
  name: "agents",
  initialState: {
    agents: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addAgent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAgent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.agents.push(action.payload);
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(removeAgent.fulfilled, (state, action) => {
        state.agents = state.agents.filter(
          (agent) => agent._id !== action.payload
        );
      });
  },
});

export const {} = agentsSlice.actions;

export default agentsSlice.reducer;
