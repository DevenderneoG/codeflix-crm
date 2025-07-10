"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchLeadStatus } from "../../store/leads/leadsSlice";
import LeadStatus from "../../components/LeadStatus";
import Loader from "../../components/common/Loader";

const LeadStatusPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const statusname = params?.statusname;

  const statusLeads = useSelector((state) => state.lead.statusLeads);
  const status = useSelector((state) => state.lead.status);
  const error = useSelector((state) => state.lead.error);

  useEffect(() => {
    if (statusname) {
      dispatch(fetchLeadStatus(statusname));
    }
  }, [dispatch, statusname]);

  if (!statusname) {
    return <p className="text-red-500">No status provided in the URL.</p>;
  }

  return (
    <div>
      {status === "loading" && <Loader />}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      {status === "succeeded" && statusLeads.length > 0 ? (
        <LeadStatus statusLeads={statusLeads} />
      ) : (
        status === "succeeded" && <p>No leads found for status: {statusname}</p>
      )}
    </div>
  );
};

export default LeadStatusPage;
