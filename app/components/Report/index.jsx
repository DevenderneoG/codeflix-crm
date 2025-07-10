"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ChartOne from "../../components/Charts/ChartOne";
import ChartTwo from "../../components/Charts/ChartTwo";
import ChartThree from "../../components/Charts/ChartThree";
import { fetchLeads } from "../../store/leads/leadsSlice";
import { fetchAgents } from "../../store/agents/agentsSlice";
import { fetchClosedLeads, fetchPipeline } from "../../store/reports/reportsSlice";

const Reports = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch = useDispatch();

  const { leads } = useSelector((state) => state.lead);
  const { agents } = useSelector((state) => state.agent);
  const { closedLeads, pipelineCount } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchAgents());
    dispatch(fetchClosedLeads());
    dispatch(fetchPipeline());
  }, [dispatch]);

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const filteredLeads = selectedStatus
    ? leads.filter((lead) => lead.status === selectedStatus)
    : leads;

  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree
          filteredLeads={filteredLeads}
          closedLeads={closedLeads}
          pipelineCount={pipelineCount}
        />
        <ChartOne filteredLeads={filteredLeads} />
        <div className="col-span-12">
          <ChartTwo filteredLeads={filteredLeads} agents={agents} />
        </div>
      </div>
    </>
  );
};

export default Reports;
