"use client";

import LeadDetail from "../../components/Leaddetail";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadDetails } from "../../store/leads/leadsSlice";
import { fetchComments } from "../../store/comments/commentSlice";
import Comments from "../../components/Comments";
import Loader from "../../components/common/Loader";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const selectedLead = useSelector((state) => state.lead.selectedLead);
  const status = useSelector((state) => state.lead.status);
  const error = useSelector((state) => state.lead.error);

  const {
    comments,
    status: commentsStatus,
    error: commentsError,
  } = useSelector((state) => state.comment);

  useEffect(() => {
    if (id) {
      dispatch(fetchLeadDetails(id));
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  if (status === "loading") return <Loader />;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      {selectedLead ? (
        <>
          <LeadDetail lead={selectedLead} />

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-xl text-black dark:text-white font-bold mb-5">Comments</h2>
            {commentsStatus === "loading" && <Loader />}
            {commentsStatus === "failed" && <p>Error: {commentsError}</p>}
            <Comments
              comments={comments}
              leadId={id}
              authorId={selectedLead?.salesAgent}
            />
          </div>
        </>
      ) : (
        <p>No lead data found.</p>
      )}
    </>
  );
};

export default LeadDetailsPage;
