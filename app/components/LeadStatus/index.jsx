import { useDispatch, useSelector } from "react-redux";
import { useState, useMemo, useEffect } from "react";
import { fetchAgents } from "../../store/agents/agentsSlice";

const LeadStatus = () => {
  const dispatch = useDispatch();
  const statusLeads = useSelector((state) => state.lead.statusLeads);
  const { agents } = useSelector((state) => state.agent);

  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const agentMap = useMemo(() => {
    const map = {};
    agents.forEach((a) => {
      map[a._id] = a.name;
    });
    return map;
  }, [agents]);

  const uniqueAgentIds = [
    ...new Set(statusLeads.map((lead) => lead.salesAgent)),
  ];
  const priorities = [...new Set(statusLeads.map((lead) => lead.priority))];

  const filteredLeads = useMemo(() => {
    let leads = [...statusLeads];

    if (selectedAgent) {
      leads = leads.filter((lead) => lead.salesAgent === selectedAgent);
    }

    if (selectedPriority) {
      leads = leads.filter((lead) => lead.priority === selectedPriority);
    }

    leads.sort((a, b) =>
      sortOrder === "asc"
        ? a.timeToClose - b.timeToClose
        : b.timeToClose - a.timeToClose
    );

    return leads;
  }, [statusLeads, selectedAgent, selectedPriority, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Leads with status: {statusLeads[0]?.status}
        </h1>
        <div className="flex flex-row items-center gap-4">
          {/* Agent Filter */}
          <div className="relative w-full min-w-[200px]">
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">All</option>
              {uniqueAgentIds.map((agentId) => (
                <option key={agentId} value={agentId}>
                  {agentMap[agentId] || agentId}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="relative w-full min-w-[200px]">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">All</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <div className="relative w-full min-w-[200px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lead Cards */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:gap-x-24">
        <ul className="space-y-3">
          {filteredLeads.map((lead) => (
            <li
              key={lead._id}
              className="w-full max-w-full rounded-sm border border-[#e2e8f0] bg-white shadow-default dark:border-[#313d4a] dark:bg-[#313d4a] p-4"
            >
              <p className="text-title-md font-bold text-black dark:text-white mb-4">
                {lead.name}
              </p>
              <p className="text-lg font-normal">
                <span className="font-semibold">Status:</span> {lead.status}
              </p>
              <p className="text-lg font-normal">
                <span className="font-semibold">Source:</span> {lead.source}
              </p>
              <p className="text-lg font-normal">
                <span className="font-semibold">Priority:</span> {lead.priority}
              </p>
              <p className="text-lg font-normal">
                <span className="font-semibold">Time to Close:</span>{" "}
                {lead.timeToClose}
              </p>
              <p className="text-lg font-normal">
                <span className="font-semibold">Sales Agent:</span>{" "}
                {agentMap[lead.salesAgent] || lead.salesAgent}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeadStatus;
