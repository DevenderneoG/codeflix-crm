import { configureStore } from "@reduxjs/toolkit";
import { leadsSlice } from "./leads/leadsSlice";
import { agentsSlice } from "./agents/agentsSlice";
import { commentSlice } from "./comments/commentSlice";
import { reportSlice } from "./reports/reportsSlice";

export default configureStore({
    reducer: {
        lead: leadsSlice.reducer,
        agent: agentsSlice.reducer,
        comment: commentSlice.reducer,
        report: reportSlice.reducer
    }
})

