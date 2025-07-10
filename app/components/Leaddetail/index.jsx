"use client";

import Link from "next/link";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="text-sm font-semibold text-black dark:text-white/90">
      {value ?? "N/A"}
    </p>
  </div>
);

const LeadDetail = ({ lead }) => {
  if (!lead) return <p>No lead data available.</p>;

  return (
    <>
      <Breadcrumb pageName="Lead Detail" />
      <div className="w-full max-w-full rounded-sm border border-[#e2e8f0] bg-white shadow-default dark:border-[#313d4a] dark:bg-[#313d4a] p-4">
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Lead Details
          </h2>
          <Link
            href={`/addlead/${lead._id}`}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 min-w-[142px] inline-block text-center"
          >
            Edit Lead
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:gap-x-24">
          <DetailRow label="ID" value={lead._id} />
          <DetailRow label="Lead Name" value={lead.name} />
          <DetailRow label="Sales Agent" value={lead.salesAgent} />
          <DetailRow label="Lead Source" value={lead.source} />
          <DetailRow label="Lead Status" value={lead.status} />
          <DetailRow label="Priority" value={lead.priority} />
          <DetailRow label="Time to Close" value={`${lead.timeToClose} Days`} />
        </div>
      </div>
    </>
  );
};

export default LeadDetail;
