"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import React, { useEffect, useState } from "react";
import CardDataStats from "../CardDataStats";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, removeLeads } from "../../store/leads/leadsSlice";
import { fetchAgents, removeAgent } from "../../store/agents/agentsSlice";
import Loader from "../common/Loader";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import AgentList from "../Agentlist";

const Settings = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const dispatch = useDispatch();
  const {
    leads,
    status: productStatus,
    error: productError,
  } = useSelector((state) => state.lead);
  const { agents } = useSelector((state) => state.agent);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchAgents());
  }, [dispatch]);

  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  const filteredLeads = selectedStatus
    ? leads.filter((lead) => lead.status === selectedStatus)
    : leads;

  const handleDelete = (id) => {
    if (!id) {
      toast.error("Invalid lead ID");
      return;
    }
    setDeletingId(id);
    dispatch(removeLeads({ id }))
      .unwrap()
      .then(() => toast.success("Lead deleted successfully!"))
      .catch((err) =>
        toast.error(
          "Failed to delete lead: " + (err.message || "Unknown error")
        )
      )
      .finally(() => setDeletingId(null));
  };

  return (
    <>
      <Breadcrumb pageName="Settings" />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="text-center">
        {productStatus === "loading" && <Loader />}
        {productError && <p>{productError}</p>}
        {leads.length === 0 && <p className="text-center">No Leads found</p>}
      </div>
      <h2 className="text-2xl font-bold mb-6 text-black">All Leads</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-6">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <div
              className="rounded-sm border border-[#e2e8f0] bg-white py-6 px-7.5 shadow-default dark:border-[#313d4a] dark:bg-[#313d4a] h-full"
              key={lead?._id}
            >
              <div className="flex justify-between items-center">
                <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-[#eff2f7] dark:bg-[#313d4a]">
                  <svg
                    className="fill-[#3C50E0] dark:fill-white"
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                      fill=""
                    />
                    <path
                      d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                      fill=""
                    />
                    <path
                      d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                      fill=""
                    />
                  </svg>
                </div>
                <div>
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="relative z-10 cursor-pointer"
                    disabled={deletingId === lead._id}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="delete"
                      version="1.1"
                      viewBox="0 0 64 64"
                      width={24}
                      height={24}
                      fill="#ff0000"
                    >
                      <g id="Icon-Trash" transform="translate(232 228)">
                        <path id="Fill-6" d="M-207.5-205.1h3v24h-3z"></path>
                        <path id="Fill-7" d="M-201.5-205.1h3v24h-3z"></path>
                        <path id="Fill-8" d="M-195.5-205.1h3v24h-3z"></path>
                        <path id="Fill-9" d="M-219.5-214.1h39v3h-39z"></path>
                        <path
                          id="Fill-10"
                          d="M-192.6-212.6h-2.8v-3c0-.9-.7-1.6-1.6-1.6h-6c-.9 0-1.6.7-1.6 1.6v3h-2.8v-3c0-2.4 2-4.4 4.4-4.4h6c2.4 0 4.4 2 4.4 4.4v3"
                        ></path>
                        <path
                          id="Fill-11"
                          d="M-191-172.1h-18c-2.4 0-4.5-2-4.7-4.4l-2.8-36 3-.2 2.8 36c.1.9.9 1.6 1.7 1.6h18c.9 0 1.7-.8 1.7-1.6l2.8-36 3 .2-2.8 36c-.2 2.5-2.3 4.4-4.7 4.4"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between">
                <div>
                  <Link href={`/leaddetail/${lead?._id}`} key={lead?._id}>
                    <h4 className="text-2xl font-bold text-black dark:text-[#313d4a] mb-4">
                      {lead?.name}
                    </h4>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-center d-block">No products found</p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-6 text-black">Agents List</h2>
        <div className="flex flex-col gap-10">
          <AgentList agents={agents} />
        </div>
      </div>
    </>
  );
};

export default Settings;
