"use client";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { fetchAgents } from "../../store/agents/agentsSlice";
import { fetchLeads } from "../../store/leads/leadsSlice";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useParams } from "next/navigation";

const AgentsView = () => {
  const { id: agentId } = useParams();
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.agent);
  const { leads } = useSelector((state) => state.lead);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchAgents());
    dispatch(fetchLeads());
  }, [dispatch]);

  const agent = agents.find((a) => a._id === agentId);
  const leadsForAgent = leads.filter((l) => l.salesAgent === agentId);

  const allStatuses = [...new Set(leadsForAgent.map((l) => l.status).filter(Boolean))];
  const allPriorities = [...new Set(leadsForAgent.map((l) => l.priority).filter(Boolean))];

  const agentLeads = useMemo(() => {
    let filtered = [...leadsForAgent];

    if (selectedStatus) {
      filtered = filtered.filter((l) => l.status === selectedStatus);
    }
    if (selectedPriority) {
      filtered = filtered.filter((l) => l.priority === selectedPriority);
    }

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.timeToClose - b.timeToClose
        : b.timeToClose - a.timeToClose
    );

    return filtered;
  }, [leadsForAgent, selectedStatus, selectedPriority, sortOrder]);

  return (
    <>
      <Breadcrumb pageName="Agent View" />

      {/* Filters */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <FilterDropdown
          label="Status"
          value={selectedStatus}
          options={allStatuses}
          onChange={setSelectedStatus}
        />
        <FilterDropdown
          label="Priority"
          value={selectedPriority}
          options={allPriorities}
          onChange={setSelectedPriority}
        />
        <FilterDropdown
          label="Sort by Time to Close"
          value={sortOrder}
          options={[
            { label: "Low to High", value: "asc" },
            { label: "High to Low", value: "desc" },
          ]}
          onChange={setSortOrder}
        />
      </div>

      {/* Lead List */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
          Sales Agent: {agent?.name || "Loading..."}
        </h2>

        {agentLeads.length > 0 ? (
          <ul className="space-y-3 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-6">
            {agentLeads.map((lead) => (
              <li
                key={lead._id}
                className="rounded-sm border border-[#e2e8f0] bg-white py-6 px-7.5 shadow-default dark:border-[#313d4a] dark:bg-[#313d4a] h-full"
              >
                <p className="text-xl font-semibold text-black mb-4 dark:text-white">{lead.name}</p>
                <p><span className="text-base font-semibold text-black dark:text-white">Status:</span> {lead.status}</p>
                <p><span className="text-base font-semibold text-black dark:text-white">Priority:</span> {lead.priority}</p>
                <p><span className="text-base font-semibold text-black dark:text-white">Time to Close:</span> {lead.timeToClose}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No data found.</p>
        )}
      </div>
    </>
  );
};

// Reusable Filter Dropdown Component
const FilterDropdown = ({ label, value, options, onChange }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}:</label>
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">All</option>
      {options.map((opt) =>
        typeof opt === "object" ? (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ) : (
          <option key={opt} value={opt}>
            {opt}
          </option>
        )
      )}
    </select>
  </div>
);

export default AgentsView;
