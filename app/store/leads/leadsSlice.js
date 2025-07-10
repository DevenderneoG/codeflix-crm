import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async () => {
  const response = await axios.get(
    "https://codeflix-crm-backend.vercel.app/leads"
  );
  // console.log(response.data);
  return response.data;
});

export const addLeads = createAsyncThunk(
  "leads/addLeads",
  async (leadsData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://codeflix-crm-backend.vercel.app/leads",
        leadsData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchLeadDetails = createAsyncThunk(
  "leads/fetchLeadDetail",
  async (leadId) => {
    const response = await axios.get(
      `https://codeflix-crm-backend.vercel.app/leads/${leadId}`
    );
    return response.data;
  }
);
export const updateLead = createAsyncThunk(
  "leads/updateLead",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://codeflix-crm-backend.vercel.app/leads/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const fetchLeadStatus = createAsyncThunk(
//   "leads/fetchLeadStatus",
//   async (statusname, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `https://codeflix-crm-backend.vercel.app/leads/status/${statusname}`
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Failed to fetch lead status"
//       );
//     }
//   }
// );

export const fetchLeadStatus = createAsyncThunk(
  "leads/fetchLeadStatus",
  async (statusname, thunkAPI) => {
    try {
      console.log("Fetching leads with status:", statusname); // ✅ Debug log
      const response = await axios.get(`https://codeflix-crm-backend.vercel.app/leads/status/${statusname}`);
      console.log(response.data, "asasasasa")
      return response.data;
    } catch (error) {
      console.error("Error fetching leads by status:", error); // ✅ Error log
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch lead status");
    }
  }
);

// export const removeLeads = createAsyncThunk(
//   "leads/removeLeads",
//   async ({ leadId }, { rejectWithValue, dispatch }) => {
//     try {
//       await axios.delete(`https://codeflix-crm-backend.vercel.app/leads/${leadId}`);
      
//       dispatch(fetchLeads());

//       return leadId;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.error ||
//         error.message ||
//         "Failed to remove lead.";
//       console.error("Remove Lead error:", errorMessage);
//       return rejectWithValue(errorMessage);
//     }
//   }
// );

export const removeLeads = createAsyncThunk(
  "lead/removeLeads",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://codeflix-crm-backend.vercel.app/leads/${id}`
      );
      return id; // return just the ID so we can remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const leadsSlice = createSlice({
  name: "lead",
  initialState: {
    leads: [],
    statusLeads: [],
    selectedLead: null,
    status: "idle",
    error: null,
  }, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leads = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leads.push(action.payload);
      })
      .addCase(addLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchLeadDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeadDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedLead = action.payload;
      })
      .addCase(fetchLeadDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateLead.fulfilled, (state, action) => {
        const index = state.leads.findIndex(
          (addr) => addr._id === action.payload._id
        );
        if (index !== -1) {
          state.leads[index] = action.payload;
        }
      })
      .addCase(updateLead.pending, (state) => {
        state.status = "loading";
      })
      // .addCase(updateLead.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      // })
      .addCase(updateLead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchLeadStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeadStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.statusLeads = action.payload;
      })
      .addCase(fetchLeadStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removeLeads.fulfilled, (state, action) => {
      state.leads = state.leads.filter((lead) => lead._id !== action.payload);
    });
  },
  
});

export const {} = leadsSlice.actions;

export default leadsSlice.reducer;
